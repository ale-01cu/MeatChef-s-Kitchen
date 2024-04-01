import React from 'react';
import { COURSE_VIDEO_PLAY_URL } from '../../utils/constants';

const VideoPlayer = ({ videoPath }) => {
  return (
    <video controls>
      <source src={COURSE_VIDEO_PLAY_URL + '/?video_path=' + videoPath} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const VideoPlayerMemo = React.memo(VideoPlayer)
export default VideoPlayerMemo;