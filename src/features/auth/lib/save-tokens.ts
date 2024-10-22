export const accessTokenKey = 'access-token-key'
export const refreshTokenKey = 'refresh-token-key'

export const saveTokens = (access: string, refresh: string) => {
	localStorage.setItem(accessTokenKey, access)
	localStorage.setItem(refreshTokenKey, refresh)
}
