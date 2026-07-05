/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import isEqual from 'fast-deep-equal';

const AuthContext = createContext(null);
const EMPTY_PHONE = {
  region_number_code: "",
  region_country_name: "",
  region_country_short_name_code: "",
  telephone_number: "",
};

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
          return {
            ...cleanProfile,
            phone: normalizePhone(cleanProfile.phone),
          };
        }

        const rawFirestoreData = userDocSnap.data();
        const actualUserProfile = normalizeUserProfile(userProfile);
        const actualFirestoreData = normalizeUserProfile(rawFirestoreData);
        // if exsting user details, else detected is new user without info, generate blank info
        if (userDocSnap.exists()) {
          if (shouldMigratePhone(rawFirestoreData?.phone)) {
            await updateDoc(userDocRef, {
              phone: actualFirestoreData.phone,
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
            name: user.displayName || "",
            display_name: "",
            email: user.email,
            phone: { ...EMPTY_PHONE },
            address: "",
            createdAt: serverTimestamp()
          };

          await setDoc(doc(db, "users", user.uid), blankProfile);
          setUserProfile(blankProfile);
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

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        authLoading,
        SaveSpecDocFirestore,
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
