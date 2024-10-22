import AppLayout from '@/components/layout/layout'
import TeamDetails from '@/features/team/components/team-details'
import ProductDetails from '@/features/warehouse/components/product-details'
import LoginPage from '@/pages/auth/login'
import BasketPage from '@/pages/basket/page'
import Home from '@/pages/home/home'
import OrderPage from '@/pages/orders/page'
import ProductsPage from '@/pages/products'
import TeamPage from '@/pages/team'
import UnitsPage from '@/pages/units/page'
import WarehousePage from '@/pages/warehouse'
import WarehouseTransactionsPage from '@/pages/warehouse-transactions'
import { Route, Routes } from 'react-router-dom'
import RolesPage from '@/pages/roles/page'
import RoleDetails from "@/pages/roles/details"
import EmployeesPage from '@/pages/employees/page'


const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/' element={<AppLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/warehouse' element={<WarehousePage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/incomes' element={<WarehouseTransactionsPage />} />
				<Route path='/orders' element={<OrderPage />} />
				<Route path='/team' element={<TeamPage />} />
				<Route path='/warehouse/:id' element={<ProductDetails />} />
				<Route path='/team/:id' element={<TeamDetails />} />
				<Route path='/units' element={<UnitsPage />} />
				<Route path='/basket' element={<BasketPage />} />
				<Route path='/roles' element={<RolesPage />} />
				<Route path='/role/:id' element={<RoleDetails />} />
				<Route path='/employees' element={<EmployeesPage />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
