import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "../Utils/Data";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header"
import Sidebar from "./Sidebar"
import Button from '../Utils/Button'
import moment from "moment";
const Search = () => {
  const { query } = useParams();
  const [video, setvideo] = useState([]);
  
  const [hamburger, setHamburger] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleRedirect = (id) => {
    navigate(`/video/${id}`);

  };



  const search = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=${query}&key=${API_KEY}`;
    setLoading(true)
    try {
      const response = await axios.get(url);
      setvideo(response.data.items);

      setLoading(false)
    } catch (error) {
      console.error("Error fetching videos: ", error.response ? error.response.data : error.message);
      setLoading(false)
    }
  
  };


  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <Header 
      onClick={() => {
        setHamburger(!hamburger);
      }}/>
      
      <Sidebar hamburger={hamburger}/>
      {!loading?<div className={`relative top-[80px]  flex flex-col gap-2 cursor-pointer ${!hamburger?'px-7 mx-20 mobile:mx-0':'mx-[250px]'}`}>
        {video.map((video,idx) => {
          return (
            <div key={idx} className="cursor-pointer"
            onClick={()=>handleRedirect(video.id.playlistId||video.id.videoId,video.snippet.channelId)}>
              <div className="flex gap-2 mobilel:flex-col">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt=""
                className={`rounded-xl hover:rounded-none mobile:w-[400px] sm:w-[270px] ${
                  !hamburger ? "w-[398px] h-fit" : "w-[350px]"
                }`}
              />
              <div className="flex flex-col gap-2 mobilel:gap-1">
                <p className="font-[400] text-[18px] w-[700px] my-2 laptop:w-[600px] tab:w-[500px] medium:w-[400px] smalltab:w-[300px] mobilel:w-[270px] mobilel:text-[12px] mobile:w-[250px] mobile:text-[14px]">{video.snippet.title}</p>
                <p className="text-gray-500 text-xs">{moment(video.snippet.publishedAt).fromNow()}</p>
                <p className="text-gray-500 text-[15px]"> {video.snippet.channelTitle}</p>
                
              </div>
              
              </div>
              
              </div>
            
            
          );
          
        })}
         {/* <Button name={'LoadMore'} className={'bg-slate-200 rounded-xl w-fit px-3'} onClick={()=>setclick(click+1)}/> */}
        </div>: <div className="loading-bar-container">
      {loading && <div className="loading-bar"></div>}
    </div>}
      
     
    </>
  );
};

export default Search;
