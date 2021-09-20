import {useEffect, useState } from "react";
import {authFetch} from "./auth/index"

export default function RoleChecker() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        authFetch("/api/protected").then(response => {
            if (response.status === 401){
                setMessage("logging")
                return null
            }
            return response.json()
        }).then(response => {
            if (response && response.message){
                setMessage(response.message)
            }
        })
    }, [])
    return (
        message
    )
}
