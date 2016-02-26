import React from 'react'
import { CloudinaryThumb, cl_full } from '../util/cloudinary.jsx'

class VisibleImage extends React.Component {
  render() {
    return <div className="thumb col-xs-6 col-md-3">
      <a
        href={cl_full(this.props.id)}
        data-toggle="lightbox"
        data-width="1000"
        data-gallery="sputnik9"
        data-type="image"
      >
        <CloudinaryThumb id={this.props.id} className='img-responsive' />
      </a>
    </div>
  }
}

class HiddenImage extends React.Component {
  render() {
    return <div
       data-width="1000"
       data-toggle="lightbox"
       data-gallery="sputnik9"
       data-remote={cl_full(this.props.id)}
       data-type='image'>
    </div>
  }
}

export default class Gallery extends React.Component {
  render() {
    return <div className='gallery'>
      {this.props.photos.shown.trim().split('\r\n').map(this._renderVisibleImage)}
      {this.props.photos.hidden.trim().split('\r\n').map(this._renderHiddenImage)}
    </div>
  }

  _renderVisibleImage(image) {
    return <VisibleImage key={image} id={image} />
  }

  _renderHiddenImage(image) {
    return <HiddenImage key={image} id={image} />
  }
}
