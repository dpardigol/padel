import { auth, db } from "./FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Fetch user data
export const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
};

// Update ELO ranking
export const updateElo = async (userId, newElo) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    elo: newElo,
  });
};

// Add a friend
export const addFriend = async (userId, friendId) => {
  const userRef = doc(db, "users", userId);
  const friendRef = doc(db, "users", friendId);

  // Add friend to user's friends list
  await updateDoc(userRef, {
    friends: arrayUnion(friendId),
  });

  // Add user to friend's friends list
  await updateDoc(friendRef, {
    friends: arrayUnion(userId),
  });
};

// Remove a friend
export const removeFriend = async (userId, friendId) => {
  const userRef = doc(db, "users", userId);
  const friendRef = doc(db, "users", friendId);

  // Remove friend from user's friends list
  await updateDoc(userRef, {
    friends: arrayRemove(friendId),
  });

  // Remove user from friend's friends list
  await updateDoc(friendRef, {
    friends: arrayRemove(userId),
  });
};
