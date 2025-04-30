import { useEffect, useState } from "react";
import axios from "axios";

const YOUTUBE_PLAYLIST_ID = "PLuY-NTS_5IpxSLENcrLkC1_E7RuWldqXR";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Youtube() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              playlistId: YOUTUBE_PLAYLIST_ID,
              maxResults: 10,
              key: API_KEY,
            },
          }
        );
        setVideos(res.data.items);
      } catch (err) {
        console.error("YouTube API 호출 실패:", err);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div>
      {videos.map((item, index) => (
        <a
          key={index}
          target="_blank"
          href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
        >
          <h4>{item.snippet.title}</h4>
          <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
          <p>{item.snippet.description}</p>
        </a>
      ))}
    </div>
  );
}
