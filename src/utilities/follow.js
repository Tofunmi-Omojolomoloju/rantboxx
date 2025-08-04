
import { db } from "../firebase/config";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

// Follow user
export async function followUser(currentUser, targetUser) {
  const followingRef = doc(db, `users/${currentUser}/following/${targetUser}`);
  const followerRef = doc(db, `users/${targetUser}/followers/${currentUser}`);
  await setDoc(followingRef, { followedAt: Date.now() });
  await setDoc(followerRef, { followedAt: Date.now() });
}

// Unfollow user
export async function unfollowUser(currentUser, targetUser) {
  const followingRef = doc(db, `users/${currentUser}/following/${targetUser}`);
  const followerRef = doc(db, `users/${targetUser}/followers/${currentUser}`);
  await deleteDoc(followingRef);
  await deleteDoc(followerRef);
}

// Check if following
export async function isFollowing(currentUser, targetUser) {
  const docRef = doc(db, `users/${currentUser}/following/${targetUser}`);
  const snap = await getDoc(docRef);
  return snap.exists();
}
