import React from 'react';
import Entry from './entry/entry.jsx';
import AudioPlayer from './audioplayer/audio-player.jsx';

export default class PremiumPage extends React.Component {
  render() {
    var entry = this.props.entries[0];
    return <div>
      <AudioPlayer songs={this.props.songs} />
      <Entry
        title={entry.title}
        videos={entry.videos}
      />
    </div>
  }
}
