import React from 'react'

class VimeoFrame extends React.Component {
  render() {
    let style = {}
    if (!this.props.display) style.display = 'none'
    return <iframe
      src={this.props.url}
      frameBorder="0"
      style={style}
      webkitallowfullscreen
      mozallowfullscreen
      allowFullScreen
    />
  }
}

export default class Videos extends React.Component {
  constructor() {
    super()
    this.state = { current_video_idx: 0 }
  }

  render() {
    return <div>
      <div className="videotitle">
        <h3 className="title">Video's:</h3>
      </div>

      <div className="video-wrap">
        <div className="titleholder">
          {this.props.videos.map(this._renderTab.bind(this))}
        </div>

        <h1 style={{display: 'none'}} >YIIHAA</h1>

        {this.props.videos.map(this._renderVideo.bind(this))}
      </div>
    </div>
  }

  _renderTab(video, i) {
    return <h3
      onClick={this._handleTabClick.bind(this, i)}
      key={`video-tab-${video.title}`}
      className={`videotitle ${this.state.current_video_idx == i ? 'active' : ''}`}>
      {video.title}
    </h3>
  }

  _renderVideo(video, i) {
    return <VimeoFrame
      url={video.url}
      key={i}
      display={this.state.current_video_idx == i}
    />
  }

  _handleTabClick(idx) {
    this.setState({current_video_idx: idx})
  }
}
