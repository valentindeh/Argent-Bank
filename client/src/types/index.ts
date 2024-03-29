export type UserInfos = {
    id: string
    email: string
    userName: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
}

export type UsernameUpdate = {
    firstName: string
    lastName: string
}

export type LoginData = {
    token: string
}