import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const [errMsg,setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        
        if(jsonData?.identifier){
            localStorage.setItem("User",jsonData.identifier);
            navigate("/chat");
        }else setErrMsg("UserName required");
    }   


    return (
        <div className=" h-[100%] w-[100%] bg-[#343333] pt-[15%]">
            <div className=" md:ml-[30%]  md:border md:w-[45%] md:rounded-lg md:p-4 md:border-[#ffffff] mx-2 my-auto p-6 ">
                <p className=" text-3xl text-[#ffffff] opacity-75">Connect</p>
                <h1 className="text-6xl font-extralight text-[#ffffff] mb-4 ">Randomly</h1>
                <form className="flex flex-col " style={{
                    maxHeight: "calc(100vh - 7.5rem)"
                }}
                onSubmit={handleLogin}
                >
                    <input name="identifier" type="text" className="m-2 p-2 border rounded-md " placeholder="Username" />
                    
                
                    <div className=" text-red-600 text-xs mx-2">
                        {errMsg}
                    </div>
                    <button type="submit" className=" m-2 p-2  text-white bg-[#665dfe] w-[95%] md:w-[98%] rounded-md" >
                    Begin
                    </button>
                </form>
            </div>
        </div>
        
    );
}

export default Login;
