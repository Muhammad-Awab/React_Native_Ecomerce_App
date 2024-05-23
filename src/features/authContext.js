import React from 'react' // Import React library

// Create a new context for authentication
const AuthContext=React.createContext()

// Export the AuthProvider component to provide authentication context to its descendants
export const AuthProvider = AuthContext.Provider;

// Export the AuthContext for accessing authentication state and methods throughout the application
export default AuthContext;