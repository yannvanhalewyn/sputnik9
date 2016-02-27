import React from 'react'
import { FieldSet, TextArea, TextInput } from '../../util/form_elements.jsx'

class SongsForm extends React.Component {
  render() {
    return <form method='post'>
      {this.props.songs.map(this._renderSong)}
      <input className='btn btn-success' type="submit" value="Opslaan"/>
    </form>
  }

  _renderSong(song) {
    return <div key={song._id}>{song.title}</div>
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
