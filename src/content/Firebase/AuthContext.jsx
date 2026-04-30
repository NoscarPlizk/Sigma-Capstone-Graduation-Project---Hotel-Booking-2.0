import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ firebaseUser, setFirebaseUser ] = useLocalStorage("firebaseUser", null);
  const [ userProfile, setUserProfile ] = useState(null);
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

        // if exsting user details, else detected is new user without info, generate blank info
        if (userDocSnap.exists()) {
          console.log("Have Firestore Profile:", userDocSnap.data());
          setUserProfile({
            id: userDocSnap.id,
            ...userDocSnap.data()
          });
        } else {
          // if account is new, generate general blank infomation.
          console.log("No Firestore profile found for this user. Generate General Blank Infomation");
          
          const blankProfile = {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email,
            phone: "",
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
    await setDoc(
      doc(db, "users", firebaseUser.uid), 
      updatedProfile, 
      { merge: true }
    );
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