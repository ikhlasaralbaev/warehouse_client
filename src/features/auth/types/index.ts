export interface IUser {
	id: number
	email: string
	password: string
	role: string
	createdAt: string // Use 'Date' type if you want to parse this string to a Date object
	updatedAt: string // Same as above
}

export interface ILoginResponse {
	message: string
	user: IUser
	accessToken: string
	refreshToken: string
}
