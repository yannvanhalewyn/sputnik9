import React from 'react'

class VisibleImage extends React.Component {
  render() {
    return <div className="thumb col-xs-6 col-md-3">
      <a href={`https://res.cloudinary.com/sputnik9/image/upload/c_scale,w_1000/v1/${this.props.id}`} data-toggle="lightbox" data-width="1000" data-gallery="sputnik9" data-type="image">
        <img src={`https://res.cloudinary.com/sputnik9/image/upload/c_thumb,g_center,h_400,w_400/v1/${this.props.id}`} className="img-responsive" height="400" width="400" />
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
       data-remote={`https://res.cloudinary.com/sputnik9/image/upload/c_scale,w_1000/v1/${this.props.id}`}
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
