import Navbar from '../components/Navbar';
import ChatBox from './ChatBox';
import MyChats from './MyChats';

const Chats = () => {
	return (
		<div>
			<Navbar />
			<div className='flex flex-row justify-between md:p-5 items-center md:space-x-5 '>
				<MyChats />
				<ChatBox />
			</div>
		</div>
	);
};

export default Chats;
