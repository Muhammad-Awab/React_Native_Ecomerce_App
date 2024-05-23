import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions for document operations
import { db, auth } from "../../../firebase"; // Import Firebase Firestore and authentication
import { uuidv4 } from "@firebase/util"; // Import UUID generator

// Function to add items to user's orders
export const addToOrders = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid); // Reference to the current user's document
    const userDocSnapshot = await getDoc(userDocRef); // Get snapshot of the user's document
    if (userDocSnapshot.exists()) { // Check if the user document exists
        const userData = userDocSnapshot.data(); // Extract user data from the snapshot
        const cartItems = userData.cart; // Retrieve cart items from user data
        const orderItems = userData.orders || []; // Initialize with existing order items or an empty array if no orders exist

        // Create new order items by mapping over cart items
        const newOrderItems = cartItems.map(item => ({
            orderId: uuidv4().replace(/-/g, '').substring(0, 12),
            id: item.id,
            image: item.image,
            title: item.title,
            brand: item.brand,
            price: item.price,
            qty: item.qty,
            date: new Date().toLocaleString()
        }));

        // Merge new order items with existing ones
        const updatedOrderItems = [...orderItems, ...newOrderItems];

        // Update user document with updated order items and empty cart
        await updateDoc(userDocRef, { orders: updatedOrderItems, cart: [] });
        console.log("Items added to order"); // Log success message
        return { success: true }; // Return success status
    }
};

// Function to retrieve all order items for the current user
export const getAllOrderItems = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid); // Reference to the current user's document
    const userDocSnapshot = await getDoc(userRef); // Get snapshot of the user's document
    const data = userDocSnapshot.data().orders || []; // Extract order items from user data or initialize with an empty array if no orders exist
    return { success: true, data }; // Return success status and order data
};
