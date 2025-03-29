// Define an interface for the structure of a cart item
export interface CartItem {
  projectId: number; // Unique identifier for the project
  projectName: string; // Name of the project associated with the cart item
  donationAmount: number; // The amount donated to the project
}
