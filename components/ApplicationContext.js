import React, { createContext, useReducer } from 'react'
import { Cookies } from 'react-cookie';
import Router from 'next/router'

export const ApplicationContext = createContext();

const cookies = new Cookies();

const initialState = {
    loading: false,
<<<<<<< HEAD
    authenticated: cookies.get('token') ? true : false,
    token: cookies.get('token') || '',
    hasCompanyDetails: false,
    username: cookies.get('username') || '',
    userid: cookies.get('userid') || '',
=======
    authenticated: true
>>>>>>> redesign the invoice form
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
        case 'COMPLETE_COMPANY_DETAILS':
            return {
                ...state,
                hasCompanyDetails: true
            }
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username,
                userid: action.userid,
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

    const completeCompanyDetails = () => {
        dispatch({
            type: "COMPLETE_COMPANY_DETAILS"
        })
    }

    const setUsername = (username, userid) => {
        dispatch({
            type: "SET_USERNAME",
            action: {
                username: username,
                userid: userid
            }
        })
    }

    const { loading, authenticated, hasCompanyDetails, username, userid, token } = state;

    const providerValue = {
        loading,
        authenticated,
        login,
        logout,
        hasCompanyDetails,
        completeCompanyDetails,
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