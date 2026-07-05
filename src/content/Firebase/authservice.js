import {   
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const EMPTY_PHONE = {
  region_number_code: "",
  region_country_name: "",
  region_country_short_name_code: "",
  telephone_number: "",
};

export async function registerUser(email, password, name) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: name,
    email: user.email,
    phone: { ...EMPTY_PHONE },
    address: "",
    createdAt: serverTimestamp()
  });

  return user;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
