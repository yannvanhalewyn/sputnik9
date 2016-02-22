import React from 'react';
import Entry from './entry/entry.jsx';
import AudioPlayer from './audioplayer/audio-player.jsx';

export default class PremiumPage extends React.Component {
  render() {
    return <div>
      <AudioPlayer songs={this.props.songs} />
      <Entry />
    </div>
  }
}
