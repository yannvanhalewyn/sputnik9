import React from 'react';
import { render } from 'react-dom';
import AudioPlayer from './audioplayer/audio-player.jsx';
import Songs from './audioplayer/songs';

render(
  <AudioPlayer songs={Songs}/>,
  document.getElementById('react-audio-player')
)
