import React from 'react';

export const cl_url = (id, opts) => `https://res.cloudinary.com/sputnik9/image/upload/c_scale,w_${opts.width}/v1/${id}`
export const cl_thumb = (id, opts) => `https://res.cloudinary.com/sputnik9/image/upload/c_thumb,g_center,h_${opts.height},w_${opts.width}/v1/${id}`

export class CloudinaryImage extends React.Component {
  render() {
    let width = this.props.width || 400
    let height = this.props.height || 400
    return <img
      src={cl_thumb(this.props.id, { width, height })}
      className="img-responsive"
      height={width}
      width={height}
    />
  }
}

