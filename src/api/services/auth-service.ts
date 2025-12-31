import baseUrl from "../config/base"



export const authSevices = {
    login: ({email, password}: {email: string, password: string }) => baseUrl.post("/sign",  {email, password} )
}