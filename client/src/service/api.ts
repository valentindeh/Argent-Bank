import {LoginData, UserInfos, UsernameUpdate} from '../types'

const apiV1User = 'http://localhost:3001/api/v1/user/'

export async function signIn(email: string, password: string) : Promise<LoginData> {
    const response = await fetch(apiV1User + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }

    const { body } = await response.json()
    return body
}

export async function getProfile(): Promise<UserInfos> {
    const response = await fetch(apiV1User + 'profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token') ?? sessionStorage.getItem('token')}`
        }
    })

    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }

    const { body } = await response.json()
    return body
}

export async function updateProfile(data: UsernameUpdate): Promise<UserInfos> {
    const response = await fetch(apiV1User + 'profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token') ?? sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const { message } = await response.json()
        throw new Error(message)
    }

    const { body } = await response.json()
    return body
}