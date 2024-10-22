import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { authSchema } from '../lib/auth.validator'
import { loginAction } from '../store/auth.actions'
const AuthForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isAuthLoading, user } = useAppSelector(state => state.auth)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: authSchema,
		onSubmit: values => {
			dispatch(loginAction(values))
				.unwrap()
				.then(res => {
					if (res?.user) {
						toast.success('User logged in successfully!')
						navigate('/', { replace: true })
					}
				})
		},
	})

	useEffect(() => {
		if (user && !isAuthLoading) {
			navigate('/', { replace: true })
		}
	}, [user, isAuthLoading])

	return (
		<div className='xs:w-[90%] md:w-[550px] rounded-md bg-white px-[30px] py-[20px] shadow-md'>
			<div className='flex flex-col items-center justify-center gap-3 my-4'>
				<h1 className='text-2xl text-center font-semibold text-slate-700'>
					Authorization
				</h1>
			</div>

			<form onSubmit={formik.handleSubmit}>
				<div className='mb-4'>
					<label htmlFor='email' className='block text-gray-700'>
						Email Address
					</label>
					<input
						id='email'
						name='email'
						type='email'
						className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							formik.touched.email && formik.errors.email
								? 'border-red-500'
								: 'border-gray-300'
						}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className='text-red-500 text-sm mt-1'>
							{formik.errors.email}
						</div>
					) : null}
				</div>

				<div className='mb-4'>
					<label htmlFor='password' className='block text-gray-700'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							formik.touched.password && formik.errors.password
								? 'border-red-500'
								: 'border-gray-300'
						}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className='text-red-500 text-sm mt-1'>
							{formik.errors.password}
						</div>
					) : null}
				</div>

				<Button
					isLoading={isAuthLoading}
					type='submit'
					className='w-full  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 my-4'
				>
					Login
				</Button>
			</form>
		</div>
	)
}

export default AuthForm
