import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

interface ImageUploadProps {
	onImageUpload: (base64Url: string) => void;
	image: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, image }) => {
	const [base64Url, setBase64Url] = useState<string>(image);

	const onUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}
		const data = new FormData();
		data.append('file', file);
		data.append('upload_preset', 'heyThere');
		data.append('cloud_name', 'duajos89g');
		try {
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/duajos89g/image/upload',
				data
			);
			console.log(res);
			setBase64Url(res.data.url);
			onImageUpload(res.data.url);
		} catch {
			console.log('error');
		}
	};

	return (
		<div className='w-full md:w-1/2 relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg'>
			<div className='rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 '>
				<label
					htmlFor='photo'
					className='cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
        rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
       focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'
				>
					Select
					<input
						id='photo'
						type='file'
						accept='image/*'
						className='text-sm cursor-pointer w-36 hidden'
						onChange={onUploadImage}
					/>
				</label>
			</div>
			<div className='relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover'>
				{base64Url ? (
					<img src={base64Url} alt='Uploaded' className='w-14 h-14' />
				) : (
					<div className='relative order-first md:order-last h-28 md:h-auto flex justify-center items-center  col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover'>
						<span className='text-gray-400 opacity-75'>
							<svg
								className='w-14 h-14'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='0.7'
								stroke='currentColor'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
								/>
							</svg>
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
