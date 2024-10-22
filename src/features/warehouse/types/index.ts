import { IUser } from '@/features/auth/types'

export interface IUnit {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

export interface IProduct {
	id: number
	name: string
	price: number
	sellPrice: number
	description: string | null
	quantity: number
	createdAt: string
	updatedAt: string
	unit: IUnit
	createdBy: IUser
	old_price?: number
	old_sell_price?: number
}

export interface IBasketProductItem extends IProduct {
	add_quantity: number
}

interface Unit {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

interface CreatedBy {
	id: number
	email: string
	password: string
	role: string
	createdAt: string
	updatedAt: string
}

interface IncomeTransaction {
	id: number
	quantity: number
	totalPrice: number
	createdAt: string
	updatedAt: string
}

interface Team {
	id: number
	fullName: string
	phone: string
	createdAt: string
}

interface Transaction {
	id: number
	totalAmount: number
	description: string
	createdAt: string
	updatedAt: string
	team: Team
}

interface TransactionProduct {
	id: number
	quantity: number
	createdAt: string
	transaction: Transaction
}

export interface IProductDetails {
	id: number
	name: string
	price: number
	sellPrice: number
	description: string | null
	quantity: number
	createdAt: string
	updatedAt: string
	unit: Unit
	createdBy: CreatedBy
	incomeTransactions: IncomeTransaction[]
	transactionProducts: TransactionProduct[]
}

interface IOrderProduct {
	productId: number
	quantity: number
}

export interface ICreateOrder {
	team: number
	products: IOrderProduct[]
	totalAmount: number
}
