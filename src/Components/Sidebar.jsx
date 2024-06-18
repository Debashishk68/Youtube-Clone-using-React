import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { FaFire } from "react-icons/fa";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { PiFilmSlateThin } from "react-icons/pi";
import { MdOutlineWifiTethering } from "react-icons/md";
import { TfiGame } from "react-icons/tfi";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GiHanger } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ hamburger,video,id }) => {
    // const [id, setId] = useState(0)
  const sidebaritems = [
    { icon: <GoHome className="w-6 h-6" />, label: "Home",id:0  },
    { icon: <SiYoutubeshorts className="w-6 h-6" />, label: "Shorts",id:1 },
    {
      icon: <MdOutlineSubscriptions className="w-6 h-6" />,
      label: "Subscriptions",id:2
    },
    { icon: <CiYoutube className="w-6 h-6" />, label: "You",id:3 },
  ];

  const hamburgerSidebar = [
    

    { icon: <FaFire className="w-6 h-6" />, label: "Trending",id:4, },
    {
      icon: <IoMusicalNoteOutline className="w-6 h-6" />,
      label: "Music",id:5
    },
    { icon: <PiFilmSlateThin className="w-6 h-6" />, label: "Science",id:6 },
    {
      icon: <MdOutlineWifiTethering className="w-6 h-6" />,
      label: "Live",id:7
    },
    { icon: <TfiGame className="w-6 h-6" />, label: "Gaming",id:8 },
    { icon: <FaRegNewspaper className="w-6 h-6" />, label: "News",id:9 },
    {
      icon: <MdOutlineSportsBasketball className="w-6 h-6" />,
      label: "Sports",id:10
    },
    {
      icon: <MdOutlineLightbulb className="w-6 h-6" />,
      label: "Entertainment",id:11
    },
    {
      icon: <MdOutlineShoppingBag className="w-6 h-6" />,
      label: "Shopping",id:12
    },

    {
      icon: <GiHanger className="w-6 h-6" />,
      label: "Fashion & beauty",id:13
    },
    {
      icon: <IoIosHelpCircleOutline className="w-6 h-6" />,
      label: "Help",id:14
    },
  ];

 
  const navigate = useNavigate();
  const handleNavigate=(label)=>{
    navigate(`/${label==='Home'?'':label.toLowerCase()}`);
  }
  
  return (
    <>
      <div 
        className={`w-fit px-2 h-[585px] flex flex-col fixed z-10 top-[68px] py-5 bg-white  mobile:px-0 ${
          hamburger
            ? " overflow-hidden hover:overflow-y-scroll w-[220px]"
            : " overflow-hidden"
        }`}
      >
        {!hamburger&&video
          ? sidebaritems.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 items-center w-[78px] h-[85px] 
          justify-center rounded-xl cursor-pointer hover:bg-slate-100 px-4 ${id===index?'bg-slate-100':null}`}

             onClick={()=>{
              handleNavigate(item.label)}}
              >
                {item.icon}
                <p className={'text-xs'}>{item.label}</p>
              </div>
            ))
          : null}
        {/* Explore Section */}
        {hamburger ? (
          <div>
            {sidebaritems.map((category, index) => (
              <div
                key={index}
                className={`flex gap-2 items-center w-[200px] h-[40px]  rounded-xl 
                      cursor-pointer hover:bg-slate-100 px-4 ${id===index?'bg-slate-100':null}`}
                      onClick={()=>{
                        handleNavigate(category.label)}}
                        
                      
            
              >
                {category.icon}
                <p>{category.label}</p>
              </div>
            ))}
            <div className="border-t-2 border-gray-300 px-4 font-semibold p-2">
              Explore
            </div>
            {hamburgerSidebar.map((category, index) => (
              <div
                key={index}
                className={`flex gap-2 items-center w-[200px] h-[40px]  rounded-xl 
                      cursor-pointer hover:bg-slate-100 px-4 ${id===index+4?'bg-slate-100':null}`}

                      onClick={()=>{
                                   handleNavigate(category.label)
                      }}
              >
                {category.icon}
                <p>{category.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;
