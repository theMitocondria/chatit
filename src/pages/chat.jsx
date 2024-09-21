import { useEffect, useState } from "react";
import LeftMsg from "../components/leftMsg";
import RightMsg from "../components/rightMsg";
import { MultiStepLoaderDemo } from "../components/LoaderApp";
// import  from "socket.io-client";
import bg from "../context/Chat.png";


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

        conn.send(JSON.stringify(event));

        updateMessages(msg);
        e.target.reset();
    }
    useEffect(() => {
        // Add the 'dark' class to the html element by default
        document.documentElement.classList.add('dark');
    }, []);
      
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
               // const data = event.data;
                const event = {
                    type: "exchange",
                    username : username
                }
                conn.send(JSON.stringify(event));
                
            }

            if(event.type === "exchange"){
                // const data = event.data;
                const u = event.username;
                setuser2(u);
                setloader(false);
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
                // const data = event.data;

                    console.log(username);
                    
                    const event = {
                        type: "exchange",
                        username : username
                    }
                    conn.send(JSON.stringify(event));
                    
                }
     
                if(event.type === "exchange"){
                    // const data = event.data;
                    const u = event.username;
                    console.log(u);
                    
                    setuser2(u);
                    setloader(false);
                }
            })
        }
    }, [conn])

    

    return (
        loader ?  (
            <MultiStepLoaderDemo />
        ) : (
            <div className=" md:p-4  bg-[#323333] h-[100%] p-3">
                <p className="md:pt-4 text-lg md:text-2xl font-thin text-[#ffffff] mb-[-12px]">
                    Randomly
                </p>
                <p className=" md:text-4xl font-bold text-3xl  text-[#ffffff] mb-4">
                    {user2}
                </p>
                <div className=" flex justify-evenly ">
                    <div className=" hidden md:block ">
                        <img src={bg} alt="Image"  className="h-[80vh]"/>
                    </div>
                    <div className="flex flex-row gap-2  md:p-2 md:rounded-md md:w-[40vw] ">
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
                                <input name="message" type="text" className="p-2 border w-full rounded-md opacity-35 px-2 mx-2" placeholder="Send Something..." />
                                <button type="submit" >
                                    <button className=" rounded-md p-2 bg-[#665DFE]  text-white ">Send</button>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    );
}

export default Chat;