import { auth, db } from "../../../firebase" // Import Firebase authentication and Firestore database
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth" // Import Firebase authentication functions
import { getDoc, doc, setDoc } from "firebase/firestore" // Import Firestore functions for document operations
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions

// Function to register a new user with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    console.log(email, password, name);
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
        const user = res.user; // Extract user data from the response
        const userDocRef = doc(db, "users", user.uid); // Reference to the user document in Firestore
        // Set user document data with user ID, name, and email
        await setDoc(userDocRef, {
            uid: user.uid,
            name,
            email
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message }; // Return error message
    }
};

// Function to log in a user with email and password
const loginWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password) // Sign in user with email and password
        const userId = res.user.uid; // Extract user ID from the response
        const userRef = doc(db, "users", userId) // Reference to the user document in Firestore
        const userDoc = await getDoc(userRef) // Get user document data from Firestore
        return {
            success: true,
            user: userDoc.data() // Return success status along with user data
        }
    } catch (err) {
        console.error(err)
    }
}

// Function to log out the current user
const logout = async () => {
    await signOut(auth); // Sign out the current user
    return { success: true } // Return success status
}

// Export login, logout, and register functions
export { loginWithEmailAndPassword, logout, registerWithEmailAndPassword };