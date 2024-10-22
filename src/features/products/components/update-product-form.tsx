import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Select from 'react-select/async'
import { warehouseUpdateSchema } from '../lib/warehouse.validator'
import {
	getWarehouseProductsAction,
	getWarehouseUnitsAction,
	updateProductAction,
} from '../store/warehouse.actions'
import { IProduct } from '../types'

type Props = {
	initialData: IProduct
	open: boolean
	setOpen: (open: boolean) => void
}

export function UpdateProductDrawer(data: Props) {
	const { units } = useAppSelector(state => state.warehouse)
	const dispatch = useAppDispatch()

	const formik: any = useFormik({
		initialValues: {
			name: '',
			unit: '',
		},
		validationSchema: warehouseUpdateSchema,
		onSubmit: (values: any) => {
			console.log(values)
			dispatch(
				updateProductAction({
					...values,
					unit: +values.unit?.value!,
					id: data?.initialData?.id,
				})
			)
				.unwrap()
				.then(res => {
					if (res.id) {
						dispatch(getWarehouseProductsAction())
						toast.success('Product added succesfully!')
						data.setOpen(false)
						formik.resetForm({
							name: '',
							price: '',
							unit: '',
						})
					}
				})
		},
	})

	useEffect(() => {
		dispatch(getWarehouseUnitsAction())
	}, [])

	useEffect(() => {
		formik.setValues({
			name: data?.initialData?.name,
			unit: {
				value: String(data?.initialData?.unit?.id),
				label: data?.initialData?.unit?.name,
			},
		})
	}, [data])

	return (
		<>
			<Dialog open={data.open} onOpenChange={() => data.setOpen(false)}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							<h2 className='text-lg font-semibold'>Add Product</h2>
						</DialogTitle>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<form onSubmit={formik.handleSubmit}>
							{/* Name Field */}
							<div className='mb-4'>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-gray-700'
								>
									Name
								</label>
								<Input
									id='name'
									name='name'
									type='text'
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={`mt-1 block w-full ${
										formik.touched.name && formik.errors.name
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className='mt-1 text-sm text-red-500'>
										{formik.errors.name}
									</div>
								) : null}
							</div>

							{/* Unit Select Field */}
							<div className='mb-4'>
								<label
									htmlFor='unit'
									className='block text-sm font-medium text-gray-700'
								>
									Unit
								</label>
								<Select
									isMulti={false}
									onChange={(e: any) =>
										formik.setValues({ ...formik.values, unit: e! })
									}
									defaultOptions={units.map(item => ({
										value: String(item.id),
										label: item.name,
									}))}
									value={formik.values.unit}
								/>

								{formik.touched.unit && formik.errors.unit ? (
									<div className='mt-1 text-sm text-red-500'>
										{formik?.errors?.unit}
									</div>
								) : null}
							</div>

							{/* Submit Button */}
							<Button
								type='submit'
								className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								Submit
							</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
