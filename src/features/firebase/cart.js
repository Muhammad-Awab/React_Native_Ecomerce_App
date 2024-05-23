import {  doc, getDoc, updateDoc } from "firebase/firestore"; // Importing Firestore functions
import { auth, db } from "../../../firebase"; // Importing authentication and Firestore database

// Function to retrieve cart items for the current user
export const getCartItems = async() => { 
    const userDocRef = doc(db,"users",auth.currentUser.uid) // Reference to the current user's document
    const userDocSnapshot = await getDoc(userDocRef) // Getting snapshot of the user document
    const data = await userDocSnapshot.data().cart; // Extracting cart data from the user document
    return {data,success:true}; // Returning cart data with success status
}
// Function to add an item to the cart
export const addToCart=async(itemId,qty)=>{
    console.log(itemId,qty)
    const productRef = doc(db,"products",itemId) // Reference to the product document
    const userDocRef = doc(db,"users",auth.currentUser.uid) // Reference to the current user's document
    const productSnapshot = await getDoc(productRef) // Getting snapshot of the product document
    const userDocSnapshot = await getDoc(userDocRef) // Getting snapshot of the user document
    if(userDocSnapshot.exists() && productSnapshot.exists()){ // Checking if both user and product exist
        const userData = userDocSnapshot.data(); // Extracting user data
        const productData = productSnapshot.data(); // Extracting product data
        const cartItems = userData.cart || []; // Retrieving current cart items or initializing empty array
        // Adding new item to the cart
        cartItems.push({
            id:itemId,
            title:productData.title,
            brand:productData.brand,
            price:productData.price,
            image:productData.image,
            qty:qty,
        })
         // Updating cart in the user document
        await updateDoc(userDocRef,{cart:cartItems})
        console.log("items added to cart")
        return {success:true,data:cartItems} // Returning success status and updated cart items
    }else{
        console.error("user or product doesnt exist")
    }
}
// Function to remove an item from the cart by its ID
export const removeItemById = async(id) => {
        const userDocRef = doc(db,"users",auth.currentUser.uid); // Reference to the current user's document
        const userDocSnapshot = await getDoc(userDocRef); // Getting snapshot of the user document
        if(userDocSnapshot.exists()){ // Checking if the user document exists
            const userData = userDocSnapshot.data(); // Extracting user data
            const newCart = userData.cart.filter((item)=>item.id!==id); // Filtering out the item to be removed from the cart
            await updateDoc(userDocRef,{cart:newCart}) // Updating cart in the user document
            const subTotal = newCart.reduce((acc,curr)=> acc+Number(curr.price)) // Calculating subtotal of the cart
            return {data:newCart,success:true,subTotal} // Returning updated cart data with success status and subtotal
        }else{
            console.log("user doesn't exists")
        }
    }
