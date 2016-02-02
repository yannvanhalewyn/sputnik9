import React from 'react';
import PlayPauze from '../util/buttons/playpauze.jsx';

export default class Navigation extends React.Component {
  render() {
    return <div className='navigation'>
      <button className='playback-button' onClick={this.props.onPrev}>
        <img src='/img/musicprevious.png' alt='Previous icon' />
      </button>

      <PlayPauze
        playing={this.props.playing}
        onPlayPauze={this.props.onPlayPauze}
      />

      <button className='playback-button' onClick={this.props.onNext}>
        <img src='/img/musicnext.png' alt='Next icon' />
      </button>
    </div>
  }
}
