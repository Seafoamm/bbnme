import { writable } from 'svelte/store';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const user = writable(null);
export const authLoading = writable(true); // New loading state

onAuthStateChanged(auth, (currentUser) => {
  user.set(currentUser);
  authLoading.set(false); // Set to false once the initial check is complete
});