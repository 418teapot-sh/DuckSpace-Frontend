import NavBar from "../components/NavBar";


const Chat  = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-[#F5F5F5]">
            <h1 className="text-2xl font-bold text-[#555555]">채팅 기능</h1>
            <NavBar/>
        </div>
    );
}

export default Chat;