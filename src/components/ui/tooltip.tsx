// Tooltip.js

import { FC } from 'react'

interface TooltipProps {
	children: React.ReactNode
	text: string
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
	return (
		<div className='relative inline-block text-center bg-red-500'>
			{children}
			<div className='absolute px-2 py-1 mb-2 text-sm text-white transition-opacity duration-300 bg-gray-700 rounded-lg opacity-0 bottom-full w-max group-hover:opacity-100'>
				{text}
				<div className='absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-700'></div>
			</div>
		</div>
	)
}

export default Tooltip
