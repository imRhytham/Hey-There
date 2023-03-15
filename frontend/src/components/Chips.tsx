import { XMarkIcon } from '@heroicons/react/24/outline';

interface ChipsProps {
	label: string;
	onClick?: () => void;
	canDelete?: boolean;
}

const Chips = ({ label, onClick, canDelete }: ChipsProps) => {
	return (
		<div className='flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-indigo-100 bg-indigo-700 border border-indigo-700 '>
			<div className='text-xs font-normal leading-none max-w-full flex-initial'>
				{label}
			</div>
			{canDelete && (
				<div className='flex flex-auto flex-row-reverse'>
					<div onClick={onClick}>
						<XMarkIcon className='h-6 w-6' />
					</div>
				</div>
			)}
		</div>
	);
};

export default Chips;
