import React from 'react'

function pad(val) {
  var pad = "00";
  return (pad + val).slice(-2);
}

function formatTime(val) {
 var mins = Math.floor(val / 60);
 var secs = Math.floor(val % 60);
 return `${pad(mins)}:${pad(secs)}`;
}

export default class PlaybackTime extends React.Component {
  render() {
    return <span className="playback-time">
      {formatTime(this.props.time)} / {formatTime(this.props.duration)}
    </span>
  }
}
