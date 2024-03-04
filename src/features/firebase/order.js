import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { uuidv4 } from "@firebase/util";

export const addToOrders = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const cartItems = userData.cart;
        const orderItems = userData.orders || []; // Initialize with existing order items or an empty array

        // Merge new order items with existing ones
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

        const updatedOrderItems = [...orderItems, ...newOrderItems];

        await updateDoc(userDocRef, { orders: updatedOrderItems, cart: [] });
        console.log("Items added to order");
        return { success: true };
    }
};

export const getAllOrderItems = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userRef);
    const data = userDocSnapshot.data().orders || [];
    return { success: true, data };
};
