import { render } from 'react-dom';
import AudioPlayer from './audioplayer/audio-player.jsx';
import Songs from './audioplayer/songs';
import * as resize from './resize';
import './video_swapper'

render(
  <AudioPlayer songs={Songs}/>,
  document.getElementById('react-audio-player')
)

$(window).on('resize', resize.video)
         .on('resize', resize.tracklist)
         .resize();
