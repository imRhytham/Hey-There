import React, { createRef } from 'react';

interface Tooltip {
	title: string;
	children: any;
}

const ToolTip = ({ title, children }: Tooltip) => {
	const tipRef: any = createRef();
	function handleMouseEnter() {
		tipRef.current.style.opacity = 1;
		tipRef.current.style.marginBottom = '80px';
	}
	function handleMouseLeave() {
		tipRef.current.style.opacity = 0;
		tipRef.current.style.marginTop = '10px';
	}
	return (
		<div
			className='relative flex items-center'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className='absolute whitespace-no-wrap bg-black text-white px-4 py-2 rounded flex items-center transition-all duration-150'
				ref={tipRef}
			>
				<div
					className='bg-black h-3 w-3 absolute'
					style={{ bottom: '-6px', transform: 'rotate(45deg)' }}
				/>
				{title}
			</div>
			{children}
		</div>
	);
};

export default ToolTip;
