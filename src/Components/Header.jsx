import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../assets/logo.svg";
import account from "../assets/account.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Header = ({ onClick }) => {
  const [query, setquery] = useState("");

  const navigate = useNavigate();
  
  

  const handleRedirect = () => {
    navigate(`/search/${query}`);
  };
  return (
    <>
      <div className=" w-full h-fit flex  justify-between fixed bg-white z-10  items-center ">
        {/* Hamburger and Logo */}
        <div className="flex gap-3 items-center px-5 laptop:px-0 sm:px-5 sm:gap-0 ">
          <div
            className="w-fit h-fit p-2 rounded-full cursor-pointer hover:bg-slate-100"
            onClick={onClick}
          >
            <RxHamburgerMenu className="w-7 h-7 medium:w-6 medium:h-6 sm:w-4 sm:h-4 mobilel:w-[14px] mobilel:h-[14px]
            mobile:w-[12px] mobile:h-[12px]" />
          </div>

          <div className="flex gap-2 items-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[50px] medium:w-[30px] sm:w-[20px] mobile:w-[15px]"
            />
            <h1 className="font-bold text-2xl medium:text-xl sm:text-xs mobilexl:text-[12px] mobile:text-[8px]">
              MYTube
            </h1>
          </div>
        </div>

        {/* Input box and other things */}

        <div className="flex gap-3 py-3 mobile:gap-[2px]">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-[530px] laptop:w-[400px] medium:w-[300px] medium:h-8 sm:w-[250px] 
              sm:h-6 sm:text-xs sm:px-1 
               h-10 px-5 mobilexl:w-[200px] mobilel:w-[150px] mobile:w-[80px] mobile:h-4 mobile:text-[8px]
               outline-none borderl-[1px] border-t-[1px] border-b-[1px] border-[#ccc] 
                rounded-tl-3xl rounded-bl-3xl"
              onChange={(e) => setquery(e.target.value)}
              value={query}
            />
            <div
              className={`w-[60px] h-10 medium:w-[50px] medium:h-8 sm:w-[30px] sm:h-[23px] sm:p-0 mobilel:p-0 mobile:h-4 mobile:w-[25px] bg-slate-100 rounded-tr-3xl rounded-br-3xl 
               border-[1px] border-[#ccc] flex justify-center items-center`}
               onClick={() => {query!==''?handleRedirect():null}}
            >
              <CiSearch className="w-7 h-7 sm:w-5 sm:h-5 mobilel:w-6  mobile:w-3 mobile:h-3" />
            </div>
          </div>
          <div className="w-fit h-fit p-3 rounded-full flex justify-center items-center bg-slate-100 hover:bg-slate-300 medium:p-2 mobilel:w-6 mobilel:h-6 mobile:w-4 mobile:p-0  mobile:h-4">
            <FaMicrophone className="w-5 h-5 medium:w-4 medium:h-4 mobilel:w-2 mobilel:h-2" />
          </div>
        </div>

        {/* Create,Notification and Account */}
        <div className="flex gap-3 items-center px-3 laptop:gap-0 ">
          <div className="w-fit h-fit p-3 rounded-full hover:bg-slate-100 laptop:p-2">
            <MdOutlineVideoCall className="w-7 h-7 laptop:w-6 laptop:h-6 mobilel:w-5 mobilel:h-5 " />
          </div>
          <div className="w-fit h-fit p-3 rounded-full hover:bg-slate-100 sm:p-1">
            <IoMdNotificationsOutline className="w-7 h-7 laptop:w-6 laptop:h-6s mobilel:w-5 mobilel:h-5" />
          </div>
          <img
            src={account}
            alt="Account"
            className="w-9 h-9 rounded-full laptop:w-7 laptop:h-7 mobilel:w-5 mobilel:h-5"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
