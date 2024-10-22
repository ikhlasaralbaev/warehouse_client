import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { refreshAction } from './features/auth/store/auth.actions'
import { useAppDispatch } from './hooks'
import AppRoutes from './routes'

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(refreshAction() as any)
	}, [])

	return (
		<>
			<Toaster />
			<AppRoutes />
		</>
	)
}

export default App
