import { employeesSlice } from './../features/employees/store/employees.slice'
import { rolesSlice } from './../features/roles/store/roles.slice'
import { authSlice } from '@/features/auth/store/auth.slice'
import { ordersSlice } from '@/features/orders/store/orders.slice'
import productwarehouseSlice from '@/features/products/store/warehouse.slice'
import { teamSlice } from '@/features/team/store/team.slice'
import { unitsSlice } from '@/features/units/store/untis.slice'
import warehouseSlice from '@/features/warehouse/store/warehouse.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Could not load state', err)
    return undefined
  }
}

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (err) {
    console.error('Could not save state', err)
  }
}

const localStorageMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action)
    const state = storeAPI.getState()
    saveState(state)
    return result
  }

const reducer = combineReducers({
  auth: authSlice.reducer,
  warehouse: warehouseSlice.reducer,
  team: teamSlice.reducer,
  units: unitsSlice.reducer,
  orders: ordersSlice.reducer,
  productwarehouseSlice: productwarehouseSlice.reducer,
  roles: rolesSlice.reducer,
  employees: employeesSlice.reducer,
})

export const store = configureStore({
  reducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
