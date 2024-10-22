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
	description: string | null
	quantity: number
	createdAt: string
	updatedAt: string
	unit: IUnit
	createdBy: IUser
}

export interface IBasketProductItem extends IProduct {
	add_quantity: number
}

export interface IIncomeTransaction {
	id: number
	quantity: number
	createdAt: string
	updatedAt: string
	product: IProduct
	createdBy: IUser
}
