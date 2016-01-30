import { render } from 'react-dom';
import AudioPlayer from './audioplayer/audio-player.jsx';
import Songs from './audioplayer/songs';

render(
  <AudioPlayer songs={Songs}/>,
  document.getElementById('react-audio-player')
)

// Resizing the tracklist
var resizeTracklist = () => {
  var topPadding = 150;
  var height = $(window).height() - $(".controller").height() - topPadding;
  $("#tracklist").css("height", height);
};

resizeTracklist();
window.onresize = resizeTracklist;
