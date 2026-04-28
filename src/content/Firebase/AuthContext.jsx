import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ firebaseUser, setFirebaseUser ] = useLocalStorage("firebaseUser", null);
  const [ userProfile, setUserProfile ] = useState(null);
  const [ authLoading, setAuthLoading ] = useState(true);

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
      if (firebaseUser.uid !== user.uid) {
        setFirebaseUser(user);
        console.log("Credentials Added Success:", user);
      }

      try {
        // This is the connection between Auth and Firestore
        // console.log("Trying to read Firestore path:", `users/${user.uid}`);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProfile({
            id: userDocSnap.id,
            ...userDocSnap.data()
          });
        } else {
          console.log("No Firestore profile found for this user.");
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error reading user profile:", error);
        setUserProfile(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        authLoading,
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