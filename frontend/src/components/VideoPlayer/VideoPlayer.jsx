import React from 'react';
import { COURSE_VIDEO_PLAY_URL } from '../../utils/constants';
import VideoJS from './VideoJs';

const VideoPlayer = ({ videoPath }) => {
const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: COURSE_VIDEO_PLAY_URL + '/?video_path=' + videoPath,
        type: 'video/mp4'
      },
      {
        src: COURSE_VIDEO_PLAY_URL + '/?video_path=' + videoPath,
        type: 'video/x-matroska'
      },
    ]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });
  };

  return (
    <div className='w-full'>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

    </div>
  );
}

const VideoPlayerMemo = React.memo(VideoPlayer)
export default VideoPlayerMemo;