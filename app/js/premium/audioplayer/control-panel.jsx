import React          from 'react';
import VolumeControls from '../util/buttons/volume-controls.jsx';
import PlaybackTime   from '../util/display/playback-time.jsx';
import ProgressBar    from '../util/display/progress-bar.jsx';
import Navigation     from './navigation.jsx';

export default class ControlPanel extends React.Component {
  render() {
    return <div className="controller">
      <div className="transport">
        <VolumeControls
          level={this.props.volume}
          onChange={this.props.onVolumeChange}
        />

        <Navigation
          onPrev={this.props.onPrev}
          onNext={this.props.onNext}
          playing={this.props.playing}
          onPlayPauze={this.props.onPlayPauze}
        />

        <ProgressBar
          value={this.props.displayTime}
          max={this.props.duration}
          onSeek={this.props.onSeek}
        />

        <PlaybackTime
          time={this.props.displayTime}
          duration={this.props.duration}
        />
      </div>
    </div>
  }
}

