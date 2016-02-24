import React from 'react'
import { CloudinaryImage, cl_url } from '../util/cloudinary.jsx'

class VisibleImage extends React.Component {
  render() {
    return <div className="thumb col-xs-6 col-md-3">
      <a
        href={cl_url(this.props.id, { width: 1000 })}
        data-toggle="lightbox"
        data-width="1000"
        data-gallery="sputnik9"
        data-type="image"
      >
        <CloudinaryImage
          className='img-responsive'
          id={this.props.id}
          width={400}
          height={400}
        />
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
       data-remote={cl_url(this.props.id, { width: 1000 })}
       data-type='image'>
    </div>
  }
}

export default class Gallery extends React.Component {
  render() {
    return <div className='gallery'>
      {this.props.photos.shown.map(this._renderVisibleImage)}
      {this.props.photos.hidden.map(this._renderHiddenImage)}
    </div>
  }

  _renderVisibleImage(image) {
    return <VisibleImage key={image} id={image} />
  }

  _renderHiddenImage(image) {
    return <HiddenImage key={image} id={image} />
  }
}
