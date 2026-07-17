/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { onAuthStateChanged } from "firebase/auth";
import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, db, storage } from "./firebase";
import isEqual from 'fast-deep-equal';

const AuthContext = createContext(null);
const EMPTY_PHONE = {
  region_number_code: "",
  region_country_name: "",
  region_country_short_name_code: "",
  telephone_number: "",
};
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

function buildAvatarStoragePath(uid) {
  return `users/${uid}/avatar/profile-image`;
}

function normalizePhone(phone) {
  if (!phone || typeof phone !== "object") {
    return { ...EMPTY_PHONE };
  }

  return {
    region_number_code:
      phone.region_number_code ?? phone.region_code ?? "",
    region_country_name:
      phone.region_country_name ?? phone.region_country ?? "",
    region_country_short_name_code:
      phone.region_country_short_name_code ?? phone.region_country_code ?? "",
    telephone_number: phone.telephone_number ?? "",
  };
}

function normalizeName(name) {
  if (name && typeof name === "object") {
    return {
      first_name: typeof name.first_name === "string" ? name.first_name.trim() : "",
      last_name: typeof name.last_name === "string" ? name.last_name.trim() : "",
    };
  }

  if (typeof name === "string") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return {
      first_name: parts[0] ?? "",
      last_name: parts.slice(1).join(" "),
    };
  }

  return {
    first_name: "",
    last_name: "",
  };
}

function formatDisplayName(name) {
  const normalizedName = normalizeName(name);
  return [normalizedName.first_name, normalizedName.last_name].filter(Boolean).join(" ");
}

function shouldMigratePhone(phone) {
  if (!phone || typeof phone !== "object") {
    return true;
  }

  return (
    "region_code" in phone ||
    "region_country" in phone ||
    "region_country_code" in phone
  );
}

function shouldMigrateName(name) {
  return (
    typeof name === "string" ||
    !name ||
    typeof name !== "object" ||
    !("first_name" in name) ||
    !("last_name" in name)
  );
}

function normalizeAvatar(avatar) {
  if (!avatar || typeof avatar !== "object") {
    return null;
  }

  const url = avatar.url?.trim() || "";
  const storagePath = avatar.storage_path?.trim() || "";

  if (!url && !storagePath) {
    return null;
  }

  return {
    url,
    storage_path: storagePath,
    file_name: avatar.file_name?.trim() || "",
    content_type: avatar.content_type?.trim() || "",
    size_bytes:
      typeof avatar.size_bytes === "number" && Number.isFinite(avatar.size_bytes)
        ? avatar.size_bytes
        : 0,
  };
}

export function AuthProvider({ children }) {
  const [ firebaseUser, setFirebaseUser ] = useLocalStorage("firebaseUser", null);
  const [ userProfile, setUserProfile ] = useLocalStorage("userProfile", null);
  const [ authLoading, setAuthLoading ] = useState(true);

  useEffect(() => {
    console.log("userProfile:", userProfile);
  }, [userProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);

      // Not logged in
      if (!user) {
        console.log("No Firebase user. Guest mode.");
        setFirebaseUser(null);
        setUserProfile(null);
        setAuthLoading(false);
        return;
      }

      // Check user is Existing;
      console.log("Existing Direct Firebase user:", user);

      // Logged in by Firebase Auth
      if (firebaseUser?.uid !== user.uid) {
        setFirebaseUser(user);
        console.log("Credentials Added Success:", user);
      }

      try {
        // This is the connection between Auth and Firestore
        // console.log("Trying to read Firestore path:", `users/${user.uid}`);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        function normalizeUserProfile(firestoreProfile) {
          if (!firestoreProfile) return null;

          const { createdAt: _createdAt, updatedAt: _updatedAt, ...cleanProfile  } = firestoreProfile;

          const normalizedName = normalizeName(cleanProfile.name);
          const normalizedDisplayName =
            cleanProfile.display_name?.trim() || formatDisplayName(normalizedName);

          return {
            ...cleanProfile,
            name: normalizedName,
            display_name: normalizedDisplayName,
            phone: normalizePhone(cleanProfile.phone),
            avatar: normalizeAvatar(cleanProfile.avatar),
          };
        }

        const rawFirestoreData = userDocSnap.data();
        const actualUserProfile = normalizeUserProfile(userProfile);
        const actualFirestoreData = normalizeUserProfile(rawFirestoreData);
        // if exsting user details, else detected is new user without info, generate blank info
        if (userDocSnap.exists()) {
          const profilePatch = {};

          if (shouldMigratePhone(rawFirestoreData?.phone)) {
            profilePatch.phone = actualFirestoreData.phone;
          }

          if (shouldMigrateName(rawFirestoreData?.name)) {
            profilePatch.name = actualFirestoreData.name;
          }

          if (!rawFirestoreData?.display_name?.trim() && actualFirestoreData.display_name) {
            profilePatch.display_name = actualFirestoreData.display_name;
          }

          if (Object.keys(profilePatch).length > 0) {
            await updateDoc(userDocRef, {
              ...profilePatch,
              updatedAt: serverTimestamp(),
            });
          }

          
          if (!userProfile) {
            console.log("Login Firestore Profile:", rawFirestoreData);
            setUserProfile({
              ...actualFirestoreData
            });
          } else if (userProfile && !isEqual(actualUserProfile, actualFirestoreData)) {
            console.log("Update Latest Firestore Profile:", rawFirestoreData);
            setUserProfile({
              ...actualFirestoreData
            });
          }

        } else {
          // if account is new, generate general blank infomation.
          console.log("No Firestore profile found for this user. Generate General Blank Infomation");
          
          const blankProfile = {
            uid: user.uid,
            name: normalizeName(user.displayName),
            display_name: user.displayName?.trim() || "",
            email: user.email ?? "",
            phone: { ...EMPTY_PHONE },
            address: "",
            createdAt: serverTimestamp()
          };

          await setDoc(doc(db, "users", user.uid), blankProfile);
          setUserProfile(normalizeUserProfile(blankProfile));
        }

      } catch (error) {
        console.error("Error reading user profile:", error);
        setUserProfile(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function SaveSpecDocFirestore(updatedProfile) {
  
    if (!firebaseUser?.uid) {
      throw new Error("No logged-in user.");
    }

    if (!updatedProfile || typeof updatedProfile !== 'object') {
      throw new Error("updatedProfile must be an object, example: { displayName: 'Mike' }");
    }

    const userRef = doc(db, "users", firebaseUser.uid);

    if ("phone" in updatedProfile) {
      const { phone, ...otherUpdates } = updatedProfile;
      const normalizedPhone = normalizePhone(phone);

      await updateDoc(
        userRef,
        {
          ...otherUpdates,
          phone: normalizedPhone,
          updatedAt: serverTimestamp()
        }
      );

      setUserProfile((prev) => ({
        ...(prev ?? {}),
        ...otherUpdates,
        phone: normalizedPhone,
      }));

      console.log('SaveSpecDocFirestore Success');
      return;
    }

    await setDoc(
      userRef, 
      {
        ...updatedProfile,
         updatedAt: serverTimestamp()
      }, 
      { merge: true }
    );

    setUserProfile((prev) => ({
      ...(prev ?? {}),
      ...updatedProfile,
    }));

    console.log('SaveSpecDocFirestore Success');
  }

  async function uploadUserAvatar(file, onProgress) {
    if (!firebaseUser?.uid) {
      throw new Error("No logged-in user.");
    }

    if (!(file instanceof File)) {
      throw new Error("Please choose an image file.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Only image uploads are allowed.");
    }

    if (file.size > MAX_AVATAR_BYTES) {
      throw new Error("Avatar image must be 2 MB or smaller.");
    }

    const storagePath = buildAvatarStoragePath(firebaseUser.uid);
    const avatarRef = ref(storage, storagePath);

    await new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(avatarRef, file, {
        contentType: file.type,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (!onProgress) {
            return;
          }

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(progress);
        },
        reject,
        resolve
      );
    });

    const avatarUrl = await getDownloadURL(avatarRef);
    const avatarPayload = {
      url: avatarUrl,
      storage_path: storagePath,
      file_name: file.name,
      content_type: file.type,
      size_bytes: file.size,
    };

    await setDoc(
      doc(db, "users", firebaseUser.uid),
      {
        avatar: avatarPayload,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setUserProfile((prev) => ({
      ...(prev ?? {}),
      avatar: avatarPayload,
    }));

    return avatarPayload;
  }

  async function removeUserAvatar() {
    if (!firebaseUser?.uid) {
      throw new Error("No logged-in user.");
    }

    const avatarStoragePath =
      userProfile?.avatar?.storage_path || buildAvatarStoragePath(firebaseUser.uid);

    try {
      await deleteObject(ref(storage, avatarStoragePath));
    } catch (error) {
      if (error?.code !== "storage/object-not-found") {
        throw error;
      }
    }

    await setDoc(
      doc(db, "users", firebaseUser.uid),
      {
        avatar: deleteField(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setUserProfile((prev) => ({
      ...(prev ?? {}),
      avatar: null,
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        authLoading,
        saveSpecDocFirestore: SaveSpecDocFirestore,
        SaveSpecDocFirestore,
        uploadUserAvatar,
        removeUserAvatar,
        isLoggedIn: !!firebaseUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
