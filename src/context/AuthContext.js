// Importing context methods from React core module
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { user: action.payload }
        case "LOGOUT_USER":
            return { user: null }
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    // Initializing user auth base state
    const [state, dispatch] = useReducer(AuthContextReducer, {
        user: null
    });
    // Checking for previously generated user token and setting initial auth state
    useEffect(() => {
        // Using JSON.parse() to convert auth obj from JSON str to JS obj
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            // Dispatch a state update if a user token is detected
            dispatch({type: "LOGIN_USER", payload: user});
        }
    }, []);
    console.log("AuthContext", state);
    // Returning context provider component
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}