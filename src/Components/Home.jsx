import Header from "./Header"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { API_KEY } from "../Utils/Data";
import axios from "axios";


import Videofeed from "./Videofeed";

const Home = () => {
  const [channelId, setchannelId] = useState([])
  const [hamburger, setHamburger] = useState(false);
  const [videoData, setvideoData] = useState('');
  const [loading, setLoading] = useState(false);

 

  const videos = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=In&key=${API_KEY}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      setvideoData(response.data.items);
      // console.log(response.data.items[0]);
      setchannelId(response.data.items[0].snippet.channelId)
      // console.log(response.data.items)
      // response.data.items.map(item=>{
      //   setchannelId(item.snippet.channelId)
        
      // })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  
  useEffect(() => {
    videos();
  }, []);
  return (
    <>
    <Header
        onClick={() => {
          setHamburger(!hamburger);
        }}/>
    <Sidebar hamburger={hamburger} video={true} id={0}/>
          {/* Home page Video section */}
            <Videofeed loading={loading} videoData={videoData} hamburger={hamburger} channelId={channelId}/>
   
    </>
  )
}

export default Home