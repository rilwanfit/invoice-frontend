import React, { createContext, useReducer, useEffect } from 'react'
import { Cookies } from 'react-cookie';
import Router from 'next/router'

export const ApplicationContext = createContext();

const cookies = new Cookies();

const initialState = {
    loading: false,
    authenticated: cookies.get('token') ? true : false,
    token: cookies.get('token') || '',
    username: cookies.get('username') || '',
    userid: cookies.get('userid') || '',
}

const appReducer = (state, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {
                ...state,
                authenticated: true,
                token: cookies.get('token')
            }
        case 'LOGOUT':
            cookies.remove('token')
            cookies.remove('username')
            cookies.remove('userid')
            return {
                ...state,
                authenticated: false
            }
        case 'SET_USERNAME':
            return {
                ...state,
                username: cookies.get('username'),
                userid: cookies.get('userid'),
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

    const setUsername = () => {
        dispatch({
            type: "SET_USERNAME",
        })
    }

    const { loading, authenticated, username, userid, token } = state;

    console.log('userid');
    console.log(userid);
    console.log(authenticated);
    

    const providerValue = {
        loading,
        authenticated,
        login,
        logout,
        username,
        userid,
        setUsername,
        token
    }

    return (
        <ApplicationContext.Provider value={providerValue}>
            {props.children}
        </ApplicationContext.Provider>
    )
}