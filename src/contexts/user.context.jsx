import { createContext, useReducer } from "react";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {}
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);



    // const value = { currentUser, setCurrentUser };



    // return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}