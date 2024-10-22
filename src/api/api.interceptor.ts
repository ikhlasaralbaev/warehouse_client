import { accessTokenKey } from '@/features/auth/lib/save-tokens'
import axios, { AxiosInstance } from 'axios'

export const baseUrl = 'http://localhost:8080'

// Define a configuration for your Axios instance
const axiosInstance: AxiosInstance = axios.create({
	baseURL: baseUrl + '/api', // Replace with your API base URL
	timeout: 10000, // Set a request timeout (10 seconds)
	headers: {
		'Content-Type': 'application/json',
		// Add any other custom headers you need
	},
})

// Request interceptor to add token (if you are using one)
axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem(accessTokenKey) // Or wherever you store your token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		// Handle errors globally, e.g., by showing a notification or logging out the user
		if (error.response && error.response.status === 401) {
			// Handle unauthorized access, e.g., by redirecting to the login page
			console.error('Unauthorized, logging out...')
			// Optionally, clear the token and redirect
			localStorage.removeItem(accessTokenKey)
			window.location.href = '/login'
		}

		return Promise.reject(error)
	}
)

export default axiosInstance
