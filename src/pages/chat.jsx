import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/Button";
import LeftMsg from "../components/leftMsg";
import RightMsg from "../components/rightMsg";
// import  from "socket.io-client";



const Chat = () => {
    const username = localStorage.getItem("User");
    const [loader,setloader] = useState(true);
    const [user2,setuser2] = useState("");
    const [messages, setMessages] = useState([]);
    const [conn, setConn] = useState(null)

    const handleSend = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        console.log(jsonData);
        if (jsonData.message === "") {
            return;
        }
        let msg = {
            identifier: username,
            message: jsonData.message,
            time: new Date().toLocaleTimeString()
        }  
        
        const event = {
            type: "message",
            data: {
                message: msg.message,
                sender: username,
                time: msg.time
            }
        }

        conn.send("message", JSON.stringify(event));

        updateMessages(msg);
        e.target.reset();
    }

    useEffect(() => {
        localStorage.setItem("messages_"+username, JSON.stringify(messages));
        //document.getElementById("chatbox").scrollTop = document.getElementById("chatbox")?.scrollHeight;
        console.log(messages);
        
        conn && conn.addEventListener("message",(e) => {
            console.log(e);
            const event = JSON.parse(e.data);
            if(event.type === "message"){
                const data = event.data;
                updateMessages(data);
            }
            if(event.type === "INIT"){
                const data = event.data;
                setloader(false);
                console.log(data);
                
                setuser2(user2);
            }
        });
    }, [messages])

    const updateMessages = (data) => {
        setMessages([...messages, data]);
        
    }

    useEffect(() => {
        if (conn == null) {
            setConn(new WebSocket("ws://localhost:8080/ws"));
        }else{
            conn.addEventListener("message", (e) => {
                console.log(e);
                const event = JSON.parse(e.data);
                if(event.type === "message"){
                    const data = event.data;
                    updateMessages(data);
                }
                if(event.type === "INIT"){
                    const u = event.user;
                    setloader(false);
                    console.log(u);
                    
                    setuser2(u);
                }
            })
        }
    }, [conn])

    

    return (
        loader ?  (
            <div>Loading ....</div>
        ) : (
            <div className="border p-3 bg-white rounded-lg m-4 md:m-auto md:w-1/3">
                <h1 className="text-2xl font-bold text-center border-b ">Server Chat  with {user2}</h1>
                <div className="flex flex-row gap-2 ">
                    <div className="w-full">
                        <div className="overflow-auto scroll-smooth" id="chatbox" style={{
                            height: "calc(100vh - 11rem)"
                        }}>
                            <div className="flex flex-col gap-2 p-2 w-full">
                                {messages && messages.map((msg, index) => {
                                    if (msg.identifier === username) {
                                        return <RightMsg key={index} message={msg.message} time={msg.time} />
                                    } else {
                                        return <LeftMsg key={index} message={msg.message} time={msg.time} />
                                    }
                                })}
                            </div>
                        </div>
                        <form className="flex flex-row w-full overflow-auto" onSubmit={handleSend}
                        >
                            <input name="message" type="text" className="p-2 border w-full rounded-md" placeholder="Send Something..." />
                            <button type="submit" >
                                <PrimaryButton className=" p-2  text-white ">Send</PrimaryButton>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default Chat;