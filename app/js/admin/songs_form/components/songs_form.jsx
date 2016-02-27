import React from 'react'
import Song from './song.jsx'

class SongsForm extends React.Component {
  render() {
    return <form method='post'>
      {this.props.songs.map(this._renderSong)}
      <input className='btn btn-success' type="submit" value="Opslaan"/>
    </form>
  }

  _renderSong(song, i) {
    return <Song idx={i} key={song._id} {...song}/>
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
      <SongsForm songs={this.state.songs} />
    </div>
  }
}
