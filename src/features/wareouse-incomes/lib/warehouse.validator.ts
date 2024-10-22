import * as Yup from 'yup'

export const warehouseSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	price: Yup.number()
		.required('Price is required')
		.positive('Price must be positive'),
	unit: Yup.object().required('Unit is required'),
})
