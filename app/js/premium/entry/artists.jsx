import React from 'react'
import { cl_thumb } from '../util/cloudinary.jsx'

class Artist extends React.Component {
  render() {
    return <div className="col-md-4">
      <div className="name">
        <img src={cl_thumb(this.props.thumb)} className="thumb" />
      <h4>{this.props.name}</h4>
      </div>
      <div className="about">
        <p>{this.props.about}</p>
      </div>
    </div>
  }
}

export default class Artists extends React.Component {
  render() {
    return <div className="artists">
      <h3 className="title">{`${this.props.title} Artists`}</h3>
      <div className="body row">
        {this.props.artists.map(this._renderArtist)}
      </div>
    </div>
  }

  _renderArtist(artist) {
    if (artist.about) {
      return <Artist
        key={artist.thumb_id}
        name={artist.name}
        about={artist.about} thumb={artist.thumb_id}
      />
    }
  }
}
