import React from 'react'

const playImg = 'img/musicplay.png'
const pauzeImg = 'img/musicpause.png'

export default class PlayPauze extends React.Component {
  render() {
    return (
      <button className="playback-button" onClick={this.props.onPlayPauze}>
        <img src={ this.props.playing ? pauzeImg : playImg } />
      </button>
    )
  }
}
