import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Import Firebase Firestore

// Function to retrieve all products
export const getProducts = async() => {
    try {
        const productsRef = collection(db,"products"); // Reference to the 'products' collection
        const productsSnapshot = await getDocs(productsRef) // Get snapshot of all documents in the 'products' collection

        // Map over each document snapshot to extract document ID and data, and return as an array of products
        const products = productsSnapshot.docs.map(doc=>({id:doc.id,...doc.data()})) 
        return products; 
    } catch (error) { // Catch any errors that occur during execution
        console.error(error) // Log the error to the console
    }
}

// Function to retrieve a product by its ID
export const getProductById = async (productId)=>{
    try {
        console.log("prod",productId) // Log the product ID to the console
        const productRef = doc(db,"products",productId) // Reference to the document with the specified product ID
        const productSnapshot = await getDoc(productRef) // Get snapshot of the specified product document

        // Extract document ID and data from the snapshot and return as a product object
        const product = {id: productSnapshot.id,...productSnapshot.data()} 
        return product;
    } catch (error) {
        console.error(error)
    }
}