import { IUnit } from '@/features/units/types'

interface CreatedBy {
	id: number
	email: string
	password: string
	role: string
	createdAt: string
	updatedAt: string
}

interface Product {
	id: number
	name: string
	price: number
	sellPrice: number
	description: string | null
	quantity: number
	createdAt: string
	updatedAt: string
	unit: IUnit
}

interface TransactionProduct {
	id: number
	quantity: number
	createdAt: string
	product: Product
}

interface Team {
	id: number
	fullName: string
	phone: string
	createdAt: string
}

export interface IOrder {
	id: number
	totalAmount: number
	description: string
	createdAt: string
	updatedAt: string
	createdBy: CreatedBy
	transactionProducts: TransactionProduct[]
	team: Team
}
