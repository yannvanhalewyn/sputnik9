import React from 'react'

export default class ProgressBar extends React.Component {
  render() {
    return <div className='musicprogress'>
      <progress
        max={this.props.max}
        value={this.props.value}
        onClick={this._onClick.bind(this)}
      />
    </div>
  }

  _onClick(e) {
    var percentage = (e.pageX - event.target.offsetLeft) / e.target.offsetWidth;
    this.props.onSeek(percentage * this.props.max);
  }
}
