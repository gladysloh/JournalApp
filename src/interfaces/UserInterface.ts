export interface LoginDetails {
    email: string,
    password: string
}

export interface SignUpDetails {
    email: string,
    displayName: string,
    password: string
}

export interface EditProfile {
    new_displayname: string
}