import React from 'react';

var cl_url = (id, opts) => {
  let w = opts.width || 400
  let h = opts.height || w
  let transform = []
  if (opts.crop) transform.push(`c_${opts.crop}`)
  if (opts.gravity) transform.push(`g_${opts.gravity}`)
  transform.push(`w_${w}`)
  transform.push(`h_${h}`)
  return `//res.cloudinary.com/sputnik9/image/upload/${transform.join(',')}/v1/${id}`
}

export const cl_thumb = id => cl_url(id, {width: 400, crop: 'thumb', gravity: 'center'})
export const cl_full = id => cl_url(id, {width: 1000})

export class CloudinaryImage extends React.Component {
  render() {
    let width = this.props.width || 400
    let height = this.props.height || 400
    return <img
      src={cl_url(this.props.id, { width, height })}
      className={this.props.className}
      height={width}
      width={height}
    />
  }
}

export class CloudinaryThumb extends React.Component {
  render() {
    return <img
      src={cl_thumb(this.props.id)}
      className={this.props.className}
      height='400'
      width='400'
    />
  }
}
