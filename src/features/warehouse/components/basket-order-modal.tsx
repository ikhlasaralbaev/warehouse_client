import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getTeamsAction } from '@/features/team/store/team.actions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiBasket } from 'react-icons/bi'
import Select from 'react-select/async'
import { basketOrderSchema } from '../lib/warehouse.validator'
import {
	createTransaction,
	getWarehouseProductsAction,
	getWarehouseUnitsAction,
} from '../store/warehouse.actions'
import { clearBasket } from '../store/warehouse.slice'

type Props = {
	totalPrice: number
}

export function BasketOrderModal({ totalPrice }: Props) {
	const { teams, totalPages, currentPage } = useAppSelector(state => state.team)
	const { basket } = useAppSelector(state => state.warehouse)
	const dispatch = useAppDispatch()
	const [drawer, setDrawer] = useState(false)

	const formik: any = useFormik({
		initialValues: {
			team: '',
		},
		validationSchema: basketOrderSchema,
		onSubmit: (values: any) => {
			dispatch(
				createTransaction({
					team: +values.team.value!,
					totalAmount: totalPrice!,
					products: basket.map(item => ({
						productId: item.id,
						quantity: item.add_quantity,
					})),
				}) as any
			)
				.unwrap()
				.then((res: any) => {
					if (res.id) {
						dispatch(getWarehouseProductsAction() as any)
						dispatch(clearBasket())
						toast.success('Transaction completed succesfully!')
						setDrawer(false)
						formik.resetForm({
							team: '',
						})
					}
				})
		},
	})

	console.log('totalPages', totalPages)

	useEffect(() => {
		dispatch(getWarehouseUnitsAction() as any)
		dispatch(getTeamsAction({ page: currentPage  }) as any)
	}, [])


	return (
		<>
			<Button onClick={() => setDrawer(true)}>
				<BiBasket /> Order
			</Button>
			<Dialog open={drawer} onOpenChange={() => setDrawer(false)}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							<h2 className='text-lg font-semibold'>Order details</h2>
						</DialogTitle>
					</DialogHeader>
					<div className='grid gap-4 '>
						<form onSubmit={formik.handleSubmit}>
							{/* Unit Select Field */}
							<div className='mb-4'>
								<label
									htmlFor='team'
									className='block text-sm font-medium text-gray-700'
								>
									Team
								</label>
								<Select
									isMulti={false}
									onChange={(e: any) =>
										formik.setValues({ ...formik.values, team: e! })
									}
									defaultOptions={teams?.map(item => ({
										value: String(item.id),
										label: item.fullName,
									}))}
									value={formik.values.team}
								/>

								{formik.touched.team && formik.errors.team ? (
									<div className='mt-1 text-sm text-red-500'>
										{formik?.errors?.team}
									</div>
								) : null}
							</div>
							<div className='mb-4'>
								<label
									htmlFor='unit'
									className='block text-sm font-medium text-gray-700'
								>
									Total price
								</label>
								<Input value={totalPrice} readOnly />

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
