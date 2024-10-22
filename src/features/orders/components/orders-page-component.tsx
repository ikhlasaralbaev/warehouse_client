import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect } from 'react'
import { getOrdersAction } from '../store/orders.actions'
import OrdersTable from './orders-table'

const OrdersPageComponent = () => {
	const dispatch = useAppDispatch()
	const { currentPage } = useAppSelector(state => state.orders)

	useEffect(() => {
		dispatch(getOrdersAction({ page: currentPage }) as any)
	}, [currentPage])

	return (
		<div>
			<OrdersTable />
		</div>
	)
}

export default OrdersPageComponent
