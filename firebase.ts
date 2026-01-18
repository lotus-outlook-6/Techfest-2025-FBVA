
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-Im7JSGx8orH9xdcFYlbOrW3RnosxG8",
  authDomain: "techfest-2025-fbva-gem.firebaseapp.com",
  projectId: "techfest-2025-fbva-gem",
  storageBucket: "techfest-2025-fbva-gem.firebasestorage.app",
  messagingSenderId: "566352866464",
  appId: "1:566352866464:web:87e94f9439de248e8eadc5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
};
