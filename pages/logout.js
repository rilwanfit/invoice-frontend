import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../components/ApplicationContext'

export default function Logout() {
    const {
        logout
    } = useContext(ApplicationContext)

    useEffect(() => {
        logout()
    }, [])

    return ('logout');
  }