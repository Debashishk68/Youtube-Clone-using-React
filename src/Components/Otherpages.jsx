import Header from "./Header"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { API_KEY } from "../Utils/Data";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const Otherpages = () => {
    const [hamburger, setHamburger] = useState(false);
    const [videoData, setvideoData] = useState([]);
    const [loading, setLoading] = useState(false);
     
    const { otherpages } = useParams()
  
    console.log(otherpages)
    const navigate = useNavigate();
    const handleRedirect = (id, channelId) => {
      navigate(`/video/${id}`);
    };
     
    const videos = async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=In&videoCategoryId=${otherpages==='science'?28:
        otherpages==='gaming'?20:otherpages==='news'?25:otherpages==='sports'?17:otherpages==='entertainment'?24:
        otherpages==='shopping'?1:otherpages==='fashion & beauty'?26:otherpages==='shorts'?24:21
      }&key=${API_KEY}`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        setvideoData(response.data.items);
        console.log(response.data.items[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
  
    
    useEffect(() => {
      videos();
    }, [otherpages]);
  return (
    <>
     <>
    <Header
        onClick={() => {
          setHamburger(!hamburger);
        }}/>
    <Sidebar hamburger={hamburger} video={true} id={otherpages==='science'?6:otherpages==='live'?7
      :otherpages==='gaming'?8:otherpages==='news'?9:otherpages==='sports'?10:otherpages==='entertainment'?11:
      otherpages==='shopping'?12:otherpages==='fashion & beauty'?13:otherpages==='shorts'?1:14}/>
          {/* Home page Video section */}
          {!loading ? (
        <div className={`${!hamburger ? "pl-24" : "pl-56 laptop:pl-24"}`}>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-y-6 py-24  laptop:grid-cols-[repeat(2,1fr)]
           mobilexl:grid-cols-[repeat(1,1fr)] mobilexl:">
            {videoData && videoData.length
              ? videoData.map((video) => {
                  return (
                    <div
                      key={video.id}
                      className="w-fit h-fit flex flex-col items-center gap-2 cursor-pointer justify-self-center"
                      onClick={() => {
                        handleRedirect(video.id, video.snippet.channelId);
                        console.log(video.snippet.categoryId);
                      }}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt=""
                        className={`rounded-xl  hover:rounded-none ${
                          !hamburger ? "w-[398px] h-fit tab:w-[300px] tab:h-fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]" : 
                          "w-[350px] laptop:w-[398px] laptop:h-fit tab:w-[300px] tab:fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]"
                        } `}
                      />
                      <div
                        className={`${
                          !hamburger ? "w-[398px]  h-fit tab:w-[300px] tab:fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]" : 
                          "w-[350px] tab:w-[300px] tab:fit mobilexl:w-[400px] mobilel:w-[200px]"
                        }`}
                      >
                        <p className="font-semibold font-sans text-[15px]">
                          {video.snippet.title}
                        </p>
                        <div className="flex gap-2">
                        <p className="text-gray-500">
                          {video.snippet.channelTitle}
                        </p>
                        <p className="text-gray-500">{moment(video.snippet.publishedAt).fromNow()}</p>
                        </div>
                        
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <div className="loading-bar-container">
        {loading && <div className="loading-bar"></div>}
      </div>
      )}
   
    </>
    </>
  )
}

export default Otherpages