import { useEffect, useState } from 'react';
import Header from './Header'
import Sidebar from './Sidebar'
import fire from '../assets/fire.svg'
import axios from 'axios'
import moment from 'moment';
import { API_KEY } from '../Utils/Data';
import { useNavigate } from 'react-router-dom';
const Trending = () => {
    const [hamburger, setHamburger] = useState(false);
    const [id, setid] = useState(0)
    const category=[{label:'Now',id:0},{label:'Music',id:1},{label:'Gaming',id:2},{label:'Sports',id:3}]
    const [videoData, setvideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleRedirect = (id) => {
        navigate(`/video/${id}`);
        
      };
 

    const videos = async () => {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=In&videoCategoryId=${id===0?0:id===1?10:id===2?20:17}&key=${API_KEY}`;
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
      }, [id]);
  return (
    <>
    <Header
        onClick={() => {
          setHamburger(!hamburger);
        }}/>
    <Sidebar hamburger={hamburger} video={true} id={4}/>
    <div className={`${!hamburger ? "pl-24" : "pl-56 laptop:pl-24"}`}>
        <div className='absolute top-24'>
        <div className='flex items-center gap-3'>
            <div className='w-fit h-fit p-3 bg-fuchsia-900 rounded-full'>
            <img src={fire} alt="" className='w-[35px]' />
            </div>
            
            <h1 className='text-3xl font-bold'>Trending</h1>
        </div>
        <div className='w-full flex gap-16 cursor-pointer border-b-[1px] border-gray-300 px-4 py-1 mobilel:w-fit mobilel:gap-10 mobile:gap-4'>
            {category.map((btns,idx)=><p key={btns.id}
             className={` font-semibold mobilel:text-[12px] ${id===idx?'border-b-2 border-red-600 px-4':null}`}
             onClick={()=>{setid(btns.id)}}>{btns.label}</p>)}
        </div>


        {!loading ? (
        <div className={`py-2 ${!hamburger ? "pl-18" : "pl-18 laptop:pl-24"}`}>
          <div className="grid grid-cols-[repeat(1,1fr)] gap-2 ">
            {videoData && videoData.length
              ? videoData.map((video) => {
                  return (
                    <div
                      key={video.id}
                      className="w-fit h-fit flex items-center gap-2 cursor-pointer mobilexl:flex-col "
                      onClick={() => {
                        handleRedirect(video.id, video.snippet.channelId);
                        console.log(video.snippet.categoryId);
                      }}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt=""
                        className={`w-[398px] rounded-xl  hover:rounded-none mobilel:w-[300px] mobile:w-[250px] `}
                      />
                      <div
                        className={`${
                          !hamburger ? "w-[398px]  h-fit tab:w-[300px] tab:fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]" : 
                          "w-[350px] tab:w-[398px] tab:fit mobilexl:w-[400px] mobilel:w-[200px]"
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
        </div>
    </div>
    </>
  )
}

export default Trending