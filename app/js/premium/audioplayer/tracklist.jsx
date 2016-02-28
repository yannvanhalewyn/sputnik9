import React from 'react';
import Song from './song.jsx';

export default class extends React.Component {
  render() {
    return <ul className='tracklist' id='tracklist'>
      {this.props.songs.map(this._renderSong.bind(this))}
    </ul>
  }

  _renderSong(song, i) {
    return <Song
      title={song.title}
      subtitle={song.artists}
      url={song.url}
      key={i}
      idx={i}
      active={this.props.currentSong == song}
      onClick={this.props.onSongClick}
      loading={this.props.loading}
    />
  }
}
