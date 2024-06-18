import axios from "axios";
import { useEffect, useState } from "react";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { TfiDownload } from "react-icons/tfi";
import { RxDotsHorizontal } from "react-icons/rx";
import { API_KEY } from "../Utils/Data";
import Button from "../Utils/Button";
import { useNavigate } from "react-router-dom";
// import {parse} from 'html-react-parser'
const Videoplay = ({videoData,id,loading,contentData,channelId,Desc}) => {

  const [channelImg, setchannelImg] = useState('')
  const [channelInfo, setchannelInfo] = useState('')
  const [categoryId, setcategoryId] = useState(10)
  const [moreVideos, setmoreVideos] = useState('')
  const navigate = useNavigate()
  
  const videoCategories = [
    { id: 1, title: "Film & Animation" },
    { id: 2, title: "Autos & Vehicles" },
    { id: 10, title: "Music" },
    { id: 15, title: "Pets & Animals" },
    { id: 17, title: "Sports" },
    { id: 18, title: "Short Movies" },
    { id: 19, title: "Travel & Events" },
    { id: 20, title: "Gaming" },
    { id: 21, title: "Videoblogging" },
    { id: 22, title: "People & Blogs" },
    { id: 23, title: "Comedy" },
    { id: 24, title: "Entertainment" },
    { id: 25, title: "News & Politics" },
    { id: 26, title: "Howto & Style" },
    { id: 27, title: "Education" },
    { id: 28, title: "Science & Technology" },
    { id: 29, title: "Nonprofits & Activism" },
    { id: 30, title: "Movies" },
    { id: 31, title: "Anime/Animation" },
    { id: 32, title: "Action/Adventure" },
    { id: 33, title: "Classics" },
    { id: 34, title: "Comedy" },
    { id: 35, title: "Documentary" },
    { id: 36, title: "Drama" },
    { id: 37, title: "Family" },
    { id: 38, title: "Foreign" },
    { id: 39, title: "Horror" },
    { id: 40, title: "Sci-Fi/Fantasy" },
    { id: 41, title: "Thriller" },
    { id: 42, title: "Shorts" },
    { id: 43, title: "Shows" },
    { id: 44, title: "Trailers" },
  ];
  const randomCategory=()=>{
        const ran = Math.floor(videoCategories.length*Math.random())
        setcategoryId(ran)
  }
  const handleRedirect = (id) => {
    navigate(`/video/${id}`);
  
  };
  const suggestedVideos = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=Us&regionCode=In&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setmoreVideos(response.data.items);
      // console.log(response.data.items[0]);
    } catch (error) {
      console.log(error);
    }
  };
   
    const formatNumber = (num) => {
        if (num >= 1e12) {
          return (num / 1e12).toFixed(2) + "T";
        } else if (num >= 1e9) {
          return (num / 1e9).toFixed(2) + "B";
        } else if (num >= 1e6) {
          return (num / 1e6).toFixed(2) + "M";
        } else if (num >= 1e3) {
          return (num / 1e3).toFixed(2) + "K";
        } else {
          return num;
        }
      };
      const channelinfo=async()=>{
        const link=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
        try {
          const render=await axios.get(link)
          setchannelImg(render.data.items[0].snippet.thumbnails.medium.url)
          setchannelInfo(render.data.items[0].statistics.subscriberCount)
        } catch (error) {
          error
        }
      }
      useEffect(() => {
        channelinfo()
        randomCategory()
        suggestedVideos()
      }, [videoData,id])
      
  return (
    <>
     <div className='w-full h-screen flex laptop:flex-col laptop:gap-4'>
     {!loading?<div className="w-fit h-fit ">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            // frameborder='0'
            className="w-[853px] h-[480px] rounded-xl tab:w-[700px] tab:h-[350px] smalltab:w-[600px] smalltab:h-[300px] mobilel:w-[400px]"
          ></iframe>
          <p className="text-[18px] font-bold my-2">{videoData.title}</p>
          <div className="flex gap-2 my-2 items-center mobilel:flex-col mobilel:items-start">
            <img src={channelImg} alt="" className="rounded-full w-10 h-10" />
            <div>
              <p className="text-[16px] font-medium font-sans ">
                {videoData.channelTitle} 
              </p>
              <p className="text-gray-600 text-xs">{formatNumber(channelInfo)} Subscribers</p>
            </div>
            <Button
              className={
                "bg-black text-white text-xs font-sans w-fit h-fit px-4 py-2 rounded-3xl"
              }
              name={"Subscribe"}
            />
            <div className="flex  items-center gap-3">
              <div className="flex">
                <Button
                  className="flex px-2 py-1 rounded-l-3xl border-r-2  bg-slate-100"
                  img={<BiLike className="w-6 h-6 font-thin" />}
                  name={formatNumber(contentData.likeCount)} 
                />
                <Button
                  img={<BiDislike className="w-6 h-6" />}
                  className={"bg-slate-100 rounded-r-3xl px-3"}
                />
              </div>
              <Button
                img={<RiShareForwardLine className="w-6 h-6" />}
                className={"bg-slate-100 px-4 rounded-3xl py-1"}
                name="Share"
              />
              <Button
                img={<TfiDownload />}
                name={"Download"}
                className={"bg-slate-100 px-4 rounded-3xl py-1"}
              />
              <RxDotsHorizontal />
            </div>
           
          </div>
          <div className="w-fit h-fit px-2 py-1 bg-slate-200 rounded-xl">
        {
        videoData?
      Desc.slice(0,200)+'.....':null
        }
          </div>
        </div>: <div className="loading-bar-container">
      {loading && <div className="loading-bar"></div>}
    </div>}
        
         {/* Suggested videos */}
         <div className="flex flex-col gap-4">
          {moreVideos && moreVideos.length
            ? moreVideos.map((video) => {
                return (
                  <div key={video.id}
                  className={"px-2 cursor-pointer"}
                  onClick={()=>{
                      handleRedirect(video.id,video.snippet.channelId)}}>
                    <div className="flex gap-2  mobilel:flex-col">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt=""
                        className="rounded-xl h-32 laptop:w-[300px] laptop:h-fit "
                      />
                      <div className="flex flex-col">
                        <h1 className="font-sans font-medium text-[15px] laptop:text-xl medium:text-[15px]">
                          {video.snippet.title}
                        </h1>
                        <p className={`text-zinc-500 text-xs laptop:[14px] laptop:text-xs`}>
                          {video.snippet.channelTitle}
                        </p>
                        <div className="flex gap-[3px] text-zinc-500">
                          <p className="text-xs">
                            {formatNumber(video.statistics.viewCount)}
                          </p>
                          <p className="text-xs">views</p>
                          <p>{video.snippet.publishAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        </div>
    </>
  )
}

export default Videoplay