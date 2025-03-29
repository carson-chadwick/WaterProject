import { useState, ReactNode, useContext, createContext } from "react";
import { CartItem } from "../types/CartItem"; // Importing the CartItem type definition

// Define the shape of the CartContext, specifying the types of the state and functions it will provide
interface CartContextType {
  cart: CartItem[]; // Array of items in the cart
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (projectId: number) => void; // Function to remove an item from the cart by projectId
  clearCart: () => void; // Function to clear all items from the cart
}

// Create a context with an initial undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// The CartProvider component wraps parts of the app that need access to cart functionality
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State to store the cart items
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if the item is already in the cart
      const existingItem = prevCart.find((c) => c.projectId === item.projectId);

      // If the item exists, update its donation amount; otherwise, add it to the cart
      const updatedCart = prevCart.map((c) =>
        c.projectId === item.projectId
          ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // Function to remove an item from the cart based on projectId
  const removeFromCart = (projectId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId));
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCart(() => []);
  };

  return (
    // Provide the cart state and its functions to the rest of the app
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children} {/* Render child components inside the provider */}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context in other components
export const useCart = () => {
  const context = useContext(CartContext);

  // Ensure that the hook is used within a CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
