import React from 'react'
import Song from './song.jsx'

class SongsForm extends React.Component {
  render() {
    return <form method='post'>
      {this.props.songs.map(this._renderSong.bind(this))}
      <input className='btn btn-success' type="submit" value="Opslaan"/>
    </form>
  }

  _renderSong(song, i) {
    return <Song idx={i} key={song._id} {...song} onDelete={this.props.onSongDelete}/>
  }
}

export default class SongsFormContainer extends React.Component {
  constructor(props) {
    super()
    this.state = { songs: props.songs }
  }

  render() {
    return <div>
      <h3>Songs</h3>
      <SongsForm
        songs={this.state.songs}
        onSongDelete={this._deleteSong.bind(this)}
      />
    </div>
  }

  _deleteSong(idx, e) {
    let songs = this.state.songs.slice()
    songs.splice(idx, 1)
    this.setState({songs})
  }
}
