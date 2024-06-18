import { useNavigate } from "react-router-dom";
import moment from "moment";
import { API_KEY } from "../Utils/Data";
import axios from "axios";
import { useEffect, useState } from "react";

const Videofeed = ({loading,hamburger,videoData}) => {
    const navigate = useNavigate();
    const handleRedirect = (id) => {
      navigate(`/video/${id}`);
    };
 

  return (
    <>
      {!loading ? (
        <div className={`${!hamburger ? "pl-24" : "pl-56 laptop:pl-24"}`}>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-y-6 py-24  laptop:grid-cols-[repeat(2,1fr)]
           mobilexl:grid-cols-[repeat(1,1fr)]">
            {videoData && videoData.length
              ? videoData.map((video) => {
                  return (
                    <div
                      key={video.id}
                      className="w-fit h-fit flex flex-col items-center gap-2 cursor-pointer justify-self-center"
                      onClick={() => {
                        handleRedirect(video.id, video.snippet.channelId);
                        // console.log(video.snippet.categoryId);
                      }}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt=""
                        className={` rounded-xl  hover:rounded-none ${
                          !hamburger ? "w-[398px] h-fit tab:w-[300px] tab:h-fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]" : 
                          "w-[350px] laptop:w-[398px] laptop:h-fit tab:w-[300px] tab:fit smalltab:w-[250px] mobilexl:w-[400px] mobilel:w-[200px]"
                        } `}
                      />
                      {/* <img src={channelImg} alt="" /> */}
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
  )
}

export default Videofeed