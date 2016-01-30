import React from 'react'

var percentage = (value, max) => {
  if (max == 0) return 0
  return 100 * value / max;
}

export default class ProgressBar extends React.Component {
  render() {
    var style = { width: `${percentage(this.props.value, this.props.max)}%` }
    return <div ref='outer' className='musicprogress-outer' onClick={this._onClick.bind(this)}>
      <div className='musicprogress-inner' style={style}></div>
    </div>
  }

  _onClick(e) {
    var outerRect = this.refs.outer.getBoundingClientRect();
    var fraction = (e.pageX - outerRect.left) / outerRect.width;
    this.props.onSeek(fraction * this.props.max);
  }
}
