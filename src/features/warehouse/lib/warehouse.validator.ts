import * as Yup from 'yup'

export const warehouseSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	price: Yup.number()
		.required('Price is required')
		.positive('Price must be positive'),
	unit: Yup.object().required('Unit is required'),
})

export const importProductSchema = Yup.object({
	product: Yup.object().required('Product is required'),
	quantity: Yup.number()
		.required('Quantity is required')
		.positive('Quantity must be positive'),
})

export const basketOrderSchema = Yup.object({
	team: Yup.object().required('Team is required'),
})
