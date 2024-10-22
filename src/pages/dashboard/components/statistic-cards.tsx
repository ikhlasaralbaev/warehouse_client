import { BiBasket, BiMoney, BiSolidBox } from 'react-icons/bi'

const StatisticCards = () => {
	return (
		<div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
			<div className='grid p-3 border rounded-lg backdrop-blur-lg'>
				<span className='mb-2 text-2xl text-amber-500'>
					<BiMoney />
				</span>
				<div className='text-sm font-semibold text-gray-500'>
					Umumiy sotilgan mahsulotlar tan narxi
				</div>
				<div className='text-2xl font-semibold'>100 000 sum</div>
			</div>
			<div className='grid p-3 border rounded-lg backdrop-blur-lg'>
				<span className='mb-2 text-2xl text-amber-500'>
					<BiMoney />
				</span>
				<div className='text-sm font-semibold text-gray-500'>
					Umumiy sotilgan mahsulotlar sotuv narxi
				</div>
				<div className='text-2xl font-semibold'>120 000 sum</div>
			</div>
			<div className='grid p-3 border rounded-lg backdrop-blur-lg'>
				<span className='mb-2 text-2xl text-green-500'>
					<BiSolidBox />
				</span>
				<div className='text-sm font-semibold text-gray-500'>Marja</div>
				<div className='text-2xl font-semibold'>20 000 sum</div>
			</div>
			<div className='grid p-3 border rounded-lg backdrop-blur-lg'>
				<span className='mb-2 text-2xl text-primary'>
					<BiBasket />
				</span>
				<div className='text-sm font-semibold text-gray-500'>Marja foizda</div>
				<div className='text-2xl font-semibold'>16%</div>
			</div>
		</div>
	)
}

export default StatisticCards
