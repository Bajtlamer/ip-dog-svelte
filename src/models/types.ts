import type { iSubnet } from "./subnet"

export type TUser = {
    id?: number
    username: string
    password: string
    fullname?: string | null
    email?: string | null
    role: string
    isAdmin: boolean
    isActive: boolean
}

export type TServer = {
    id?: number
    name: string
    hostname: string
    username: string
    password: string
    description?: string | null
    status: boolean
    subnets?: iSubnet[]
}

export type TSubnet = {
    id?: number
    subnet: string
    description?: string | null
    devices?: TDevice[]
    serverId: number
}

export type TEditSubnet = {
    subnet: string
    description?: string | null
    serverId: number
}

export type TDevice = {
    id?: number
    address: string
    hostname?: string | null
    description?: string | null
}

export type AuthTokenResponse = {
    auth: boolean,
    token?: string,
    message?: string
}

export type TModal = {
    title: string,
    message: string,
    buttons: TButton[],
    type?: string
}

type ModalFunction = () => void;

export type TButton = {
    text: string,
    class?: string
    handler: Promise<ModalFunction> | ModalFunction,
}