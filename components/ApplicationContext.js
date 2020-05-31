import React, { createContext, useReducer } from 'react'
import { Cookies } from 'react-cookie';
import Router from 'next/router'

export const ApplicationContext = createContext();

const cookies = new Cookies();

const initialState = {
    loading: false,
    authenticated: cookies.get('token') ? true : false
}

const appReducer = (state, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {
                ...state,
                authenticated: true
            }
        case 'LOGOUT':
            cookies.remove('token')
            return {
                ...state,
                authenticated: false
            }
        default:
            return state
    }
}

export const ApplicationProvider = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    const login = () => {
        dispatch({
            type: "AUTHENTICATE"
        })
    }
    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        Router.push('/')
    }

    const { loading, authenticated } = state;

    const providerValue = {
        loading,
        authenticated,
        login,
        logout
    }

    return (
        <ApplicationContext.Provider value={providerValue}>
            {props.children}
        </ApplicationContext.Provider>
    )
}