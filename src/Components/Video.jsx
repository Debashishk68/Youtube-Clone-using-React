import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { API_KEY } from "../Utils/Data";
// import Button from "../Utils/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar"
import Videoplay from "./Videoplay";
const Video = () => {
  const { id } = useParams();

  const [data, setdata] = useState([])
  const [contentData, setcontentData] = useState([])
  const [channelId, setchannelId] = useState('')
  const [hamburger, setHamburger] = useState(false)
  const [desc,setDesc] = useState('')
  
  const [loading, setLoading] = useState(false);



  
  const videoload = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
    setLoading(true)
    try {
      const response = await axios.get(url);
      setdata(response.data.items[0].snippet);
      setchannelId(response.data.items[0].snippet.channelId)
      setDesc(response.data.items[0].snippet.description)
      
      setLoading(false)
      setcontentData(response.data.items[0].statistics)
    } catch (error) {
      console.log(error);
      setLoading(true)
    }
  };

 
  useEffect(() => {
    videoload();
  }, [id]);

  

  return (
    <>
      <Header
        onClick={() => {
          setHamburger(!hamburger);
        }}
      />

      <Sidebar hamburger={hamburger} video={false} />

      {/*Video player Section*/}
     

      <div className="relative top-[80px] px-7 flex gap-3 ">
      { data?
       <Videoplay videoData={data} contentData={contentData} id={id} loading={loading} channelId={channelId} Desc={desc} />:null}
        {/* Suggested videos */}





     
              
      </div>
    </>
  
  );
};

export default Video;
