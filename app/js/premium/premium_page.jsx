import React from 'react';
import AudioPlayer from './audioplayer/audio-player.jsx';
import Header from './entry/header.jsx';

export default class PremiumPage extends React.Component {
  render() {
    let entries = require('./entries')
    let songs = require('./audioplayer/songs')
    return <div>
      <AudioPlayer songs={songs} />
      <div className="main">
        <Header entries={entries} location={this.props.location}></Header>
        {this.props.children}
      </div>
    </div>
  }
}
