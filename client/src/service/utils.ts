import {jwtDecode, JwtPayload} from 'jwt-decode'

export const isTokenValid = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token)

    return !(!decoded.exp || decoded.exp * 1000 < Date.now())
}