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
