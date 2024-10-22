import { useAppDispatch } from '@/hooks'
import { useEffect } from 'react'
import { getUnitsAction } from '../store/units.actions'
import { UnitsTable } from './untis-table'

const UnitsPageComponent = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getUnitsAction())
	}, [])

	return <UnitsTable />
}

export default UnitsPageComponent
