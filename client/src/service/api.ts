import {UserInfos, UsernameUpdate} from '../types'

const apiV1User = 'http://localhost:3001/api/v1/user/'

export class HttpError extends Error {
    statusCode: number

    constructor(response: Response) {
        super('Unknown request error')
        this.statusCode = response.status
    }
}

export type LoginData = {
    token: string
}

export async function signIn(email: string, password: string) : Promise<LoginData> {
    const response = await fetch(apiV1User + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        throw new HttpError(response)
    }

    const { body } = await response.json()

    return body
}

export async function getProfile(token: string): Promise<UserInfos> {
    const response = await fetch(apiV1User + 'profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new HttpError(response)
    }

    const { body } = await response.json()

    return body
}

export async function updateProfile(data: UsernameUpdate, token: string): Promise<UserInfos> {
    const response = await fetch(apiV1User + 'profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new HttpError(response)
    }

    const { body } = await response.json()

    return body
}