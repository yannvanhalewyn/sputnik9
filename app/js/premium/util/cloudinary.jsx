import React from 'react';

export const cl_url = (id, opts) => {
  let w = opts.width || 400
  let h = opts.height || w
  return `https://res.cloudinary.com/sputnik9/image/upload/c_thumb,g_center,h_${w},w_${h}/v1/${id}`
}

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

