import Navbar from '../components/Navbar';
import ChatBox from './ChatBox';
import MyChats from './MyChats';

const Chats = () => {
	return (
		<div>
			<Navbar />
			<div className='flex flex-row justify-between p-5 items-center space-x-0 md:space-x-5 '>
				<MyChats />
				<ChatBox />
			</div>
		</div>
	);
};

export default Chats;
