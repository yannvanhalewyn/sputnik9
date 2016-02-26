import React from 'react';
import songs from './audioplayer/songs';
import AudioPlayer from './audioplayer/audio-player.jsx';
import Header from './entry/header.jsx';

export default class PremiumPage extends React.Component {
  render() {
    let entries = require('./entries')
    return <div>
      <AudioPlayer songs={songs} />
      <div className="main">
        <Header entries={entries}></Header>
        {this.props.children}
      </div>
    </div>
  }
}
