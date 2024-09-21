


const RightMsg = ({ message }) => {
    return (
        <div className="flex flex-row justify-end">
            <div className="bg-[#383f44] p-2 text-white opacity-65">
                {message}
            </div>
            <span className=" text-[#383f44] ml-[-3px]">
                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
            </span>
        </div>
    );
}

export default RightMsg;