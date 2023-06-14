import { verifyUser } from "middleware"
import { useEffect, useState } from "react"
import { USERROLE } from "app/modules/auth"

export function useUser() {
    const [userAuth, setUserAuth] = useState<USERROLE>()
    const session = sessionStorage.getItem('bt-auth')

    useEffect(() => {
        async function get() {
            if (session) {
                const u = JSON.parse(session)
                const res_user: any = await verifyUser(u)
                setUserAuth(res_user)
            }
        }
        get()
    }, [session])
    return userAuth
}