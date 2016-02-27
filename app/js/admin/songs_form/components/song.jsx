import React from 'react'
import { FieldSet, TextArea, TextInput } from '../../util/form_elements.jsx'

export default class Song extends React.Component {
  render() {
    let title_name = `songs[${this.props.idx}][title]`
    let artists_name = `songs[${this.props.idx}][artists]`
    let url_name = `songs[${this.props.idx}][url]`

    return <div>
      <div className="row">
        <TextInput
          label='Titel'
          name={title_name}
          val={this.props.title}
          classes='col-md-6'
        />
        <TextInput
          label='Url'
          name={url_name}
          val={this.props.url}
          classes='col-md-6'
        />
      </div>
      <TextInput
        label='Artists'
        name={artists_name}
        val={this.props.artists}
      />
      <button onClick={this._deleteClicked.bind(this)} className='btn btn-danger'>&times;</button>
      <hr />
    </div>
  }

  _deleteClicked(e) {
    e.preventDefault()
    this.props.onDelete(this.props.idx)
  }
}
