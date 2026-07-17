import {   
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, authPersistenceReady, db } from "./firebase";

const EMPTY_PHONE = {
  region_number_code: "",
  region_country_name: "",
  region_country_short_name_code: "",
  telephone_number: "",
};

function normalizeName(name) {
  if (typeof name !== "string") {
    return {
      first_name: "",
      last_name: "",
    };
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return {
      first_name: "",
      last_name: "",
    };
  }

  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
  };
}

function buildUserProfilePayload(user, rawName) {
  const normalizedDisplayName = typeof rawName === "string" ? rawName.trim() : "";

  return {
    uid: user.uid,
    name: normalizeName(normalizedDisplayName || user.displayName || ""),
    display_name: normalizedDisplayName || user.displayName || "",
    email: user.email ?? "",
    phone: { ...EMPTY_PHONE },
    address: "",
    createdAt: serverTimestamp()
  };
}

export async function registerUser(email, password, name) {
  await authPersistenceReady;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  const normalizedDisplayName = typeof name === "string" ? name.trim() : "";

  if (normalizedDisplayName) {
    await updateProfile(user, { displayName: normalizedDisplayName });
  }

  await setDoc(doc(db, "users", user.uid), buildUserProfilePayload(user, normalizedDisplayName));

  return user;
}

export async function loginUser(email, password) {
  await authPersistenceReady;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function loginWithGoogle() {
  await authPersistenceReady;

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
