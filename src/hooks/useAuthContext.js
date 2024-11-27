import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    // Using React hook useContext() to retrieve "value" from our Context object's ContextProvider wrapper
    const context = useContext(AuthContext); // "context" should now be equal to "value" (from <Context.Provider>)
    if (!context) {
        throw Error("useAuthContext() must be used within a <AuthContextProvider> component");
    } return context;
}