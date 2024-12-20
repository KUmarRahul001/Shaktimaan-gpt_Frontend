import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have Firebase initialized and `db` exported

/**
 * Custom hook to store and retrieve data from Firebase Firestore.
 * @param key Unique key to identify the document in Firestore.
 * @param initialValue Initial value to set if no data exists in Firestore.
 */
export function useFirebaseStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    // Fetch the data from Firebase when the component mounts
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'chats', key); // "chats" is the Firestore collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStoredValue(docSnap.data().value as T);
        } else {
          // If no data exists, initialize with the initial value
          await setDoc(docRef, { value: initialValue });
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, [key, initialValue]);

  useEffect(() => {
    // Save the data to Firebase whenever the `storedValue` changes
    const saveData = async () => {
      try {
        const docRef = doc(db, 'chats', key);
        await updateDoc(docRef, { value: storedValue });
      } catch (error) {
        console.error('Error saving data to Firebase:', error);
      }
    };

    saveData();
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
