"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

interface AuthContextType {
  user: User | null;
  userInfo: any | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  checkEmailVerification: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  getUserInfo: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const getUserInfo = useCallback(async () => {
    if (!user) return null;

    try {
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserInfo(userData);
        return userData;
      } else {
        setUserInfo(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        await getUserInfo();
        if (
          [process.env.NEXT_PUBLIC_KEY1, process.env.NEXT_PUBLIC_KEY2, process.env.NEXT_PUBLIC_KEY3].includes(user.uid)
        )
          setIsAdmin(true);
      } else {
        setUserInfo(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, [getUserInfo]);

  const createUserDocument = async (user: User, additionalData?: any) => {
    if (!user) return null;

    const userRef = doc(db, "Users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      const userData = {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      };

      try {
        await setDoc(userRef, userData);
        setUserInfo(userData);
        return userData;
      } catch (error) {
        console.error("Error creating user document:", error);
        return null;
      }
    } else {
      const userData = userSnap.data();
      setUserInfo(userData);
      return userData;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserDocument(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await createUserDocument(result.user, { displayName: name });
      await firebaseSendEmailVerification(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const sendEmailVerification = async () => {
    if (!user) throw new Error("No user logged in");
    try {
      await firebaseSendEmailVerification(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const checkEmailVerification = async () => {
    if (!user) return;
    try {
      await user.reload();
      setUser({ ...user });
    } catch (error) {
      console.error("Error checking email verification:", error);
    }
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) throw new Error("No user logged in");
    try {
      await updateProfile(user, { displayName });
      const userRef = doc(db, "Users", user.uid);
      await setDoc(userRef, { displayName }, { merge: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user?.email) throw new Error("No user logged in");
    try {
      const credential = EmailAuthProvider.credential(user?.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value: AuthContextType = {
    user,
    userInfo,
    isLoggedIn: !!user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    logout,
    resetPassword,
    sendEmailVerification,
    checkEmailVerification,
    updateUserProfile,
    changePassword,
    getUserInfo,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
