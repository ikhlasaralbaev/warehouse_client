import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/hooks'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { createUnitAction, getUnitsAction } from '../store/units.actions'

export function CreateUnitForm() {
	const dispatch = useAppDispatch()
	const [drawer, setDrawer] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required('Name is required')
				.min(2, 'Name must be at least 2 characters'),
		}),
		onSubmit: values => {
			dispatch(createUnitAction(values))
				.unwrap()
				.then(res => {
					if (res.id) {
						dispatch(getUnitsAction())
						toast.success('Unit added successfully!')
						setDrawer(false)
						formik.resetForm()
					}
				})
		},
	})

	useEffect(() => {
		dispatch(getUnitsAction())
	}, [dispatch])

	return (
		<>
			<Button onClick={() => setDrawer(true)}>Add Unit</Button>
			<Dialog open={drawer} onOpenChange={() => setDrawer(false)}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							<h2 className='text-lg font-semibold'>Add Unit</h2>
						</DialogTitle>
					</DialogHeader>
					<div className='grid gap-4 '>
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

							{/* Submit Button */}
							<Button
								type='submit'
								className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								Save
							</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
