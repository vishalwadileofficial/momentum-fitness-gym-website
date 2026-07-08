/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/services/firebase/config';
import { getFriendlyErrorMessage } from '@/utils/authErrors';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('momentum_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      // Clean up previous snapshot listener if any
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen to real-time updates of user document in Firestore
        unsubscribeSnapshot = onSnapshot(
          userRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const uData = {
                ...firebaseUser,
                ...docSnap.data()
              };
              setCurrentUser(uData);
              localStorage.setItem('momentum_user', JSON.stringify({ uid: uData.uid, email: uData.email, name: uData.name || uData.displayName, role: uData.role || 'member', plan: uData.plan || 'Elite Performance' }));
            } else {
              // Fallback during user creation
              const uData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || '',
                photoURL: firebaseUser.photoURL || '',
                role: 'member'
              };
              setCurrentUser(uData);
              localStorage.setItem('momentum_user', JSON.stringify({ uid: uData.uid, email: uData.email, name: uData.name || uData.displayName, role: uData.role, plan: 'Elite Performance' }));
            }
            setLoading(false);
          },
          () => {
            // Firestore fetch failed; keep basic auth details to prevent breakages
            setCurrentUser(firebaseUser);
            setLoading(false);
          }
        );
      } else {
        // Check if there is an offline fallback user active
        const stored = localStorage.getItem('momentum_user');
        if (stored && stored.includes('offline-')) {
          setCurrentUser(JSON.parse(stored));
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update firebase profile display name
      await updateProfile(user, { displayName: name });

      // Save user doc to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        photoURL: '',
        role: 'member',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return user;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          role: 'member',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      return user;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      localStorage.removeItem('momentum_user');
      setCurrentUser(null);
      await signOut(auth);
    } catch (err) {
      localStorage.removeItem('momentum_user');
      setCurrentUser(null);
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword) => {
    setLoading(true);
    setError(null);
    try {
      if (!auth.currentUser) throw new Error('User not authenticated.');
      await updatePassword(auth.currentUser, newPassword);
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
      throw new Error(friendlyMsg, { cause: err });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    changePassword,
    getFriendlyErrorMessage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

