export interface PaginationResponse<T> {
	data: T[]
	count: number
	currentPage: string
	totalPages: number
}
