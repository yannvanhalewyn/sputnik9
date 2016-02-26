import React from 'react'
import { FieldSet, TextArea, TextInput } from './form_elements.jsx'

class Video extends React.Component {
  render() {
    return <div className="video-frame row">
      <div className="col-md-4">
        <TextInput name={`videos[${this.props.idx}][title]`} label='Titel' val={this.props.title} />
      </div>
      <div className="col-md-8">
        <FieldSet label='Vimeo Url' >
          <div>
            <input
              className='form-control vimeo-url'
              defaultValue={this.props.url}
              type="text"
              name={`videos[${this.props.idx}][url]`} />
            <button
              onClick={this.props.onDelete}
              className="btn btn-danger delete">
              &times;
            </button>
          </div>
        </FieldSet>
      </div>
    </div>
  }
}

export default class Videos extends React.Component {
  constructor(props) {
    super()
    this.state = {videos: props.videos}
  }

  render() {
    return <div>
      <h3>Video's <button onClick={this._addVideo.bind(this)} className="btn btn-success">+</button></h3>
      <small className='text-muted'>Urls zijn de urls voor de iframe, en dus niet de iFrame zelf</small>
      {this.state.videos.map(this._renderVideo.bind(this))}
    </div>
  }

  _renderVideo(video, i) {
    return <Video
      key={video._id}
      idx={i} {...video}
      onDelete={this._removeVideo.bind(this, i)}
    />
  }

  _addVideo(e) {
    e.preventDefault()
    this.setState({videos: [...this.state.videos, {_id: Date.now() }]})
  }

  _removeVideo(idx, e) {
    e.preventDefault()
    let videos = this.state.videos.slice()
    videos.splice(idx, 1)
    this.setState({videos})
  }
}
