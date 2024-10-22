import * as Yup from 'yup'

export const warehouseSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  unit: Yup.object().required('Unit is required'),
  sellPrice: Yup.number().required('Sell price is required'),
  minCount: Yup.number().required('Minimum count is required'),
})

export const warehouseUpdateSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  unit: Yup.object().required('Unit is required'),
})
