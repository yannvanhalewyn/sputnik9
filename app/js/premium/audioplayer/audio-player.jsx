import React from 'react';
import ControlPanel from './control-panel.jsx';
import Tracklist from './tracklist.jsx';

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      duration: 0,
      displayTime: 0,
      volume: 50,
      currentSong: props.songs[0],
      loading: false
    }
  }

  render() {
    return (
      <div>
        <Tracklist
          songs={this.props.songs}
          currentSong={this.state.currentSong}
          onSongClick={this._onSongClick.bind(this)}
          loading={this.state.loading}
        />

        <ControlPanel
          playing={this.state.playing}
          onPlayPauze={this._onPlayPauze.bind(this)}
          onPrev={this._playPrev.bind(this)}
          onNext={this._playNext.bind(this)}
          displayTime={this.state.displayTime}
          duration={this.state.duration}
          onSeek={this._onSeek.bind(this)}
          volume={this.state.volume}
          onVolumeChange={this._onVolumeChange.bind(this)}
        />
      </div>
    )
  }

  /*
   * ============================
   * Control panel event handlers
   * ============================
   */
  _onPlayPauze() {
    if (!this.howl) {
      this._playSong(this.props.songs[0]);
    } else {
      this.state.playing ? this.howl.pause() : this.howl.play()
      this.setState({playing: !this.state.playing})
    }
  }

  _playPrev() {
    this._swapSong(this.state.currentSong.id - 1);
  }

  _playNext() {
    this._swapSong((this.state.currentSong.id + 1) % this.props.songs.length);
  }

  _onSongClick(songId) {
    this._swapSong(songId);
  }

  _onSeek(newPosition) {
    if (!this.howl) return;
    this.howl.pos(newPosition);
    this.setState({displayTime: newPosition});
  }

  _onVolumeChange(vol) {
    this.setState({volume: vol});
    this.howl.volume(vol / 100);
  }

  /*
   * ===============
   * Private helpers
   * ===============
   */
  _clearSong() {
    if (this.howl) this.howl.stop().unload();
    if (this.interval) clearInterval(this.interval);
  }

  _swapSong(songId) {
    var songToPlay = this.props.songs[songId];
    if (!songToPlay) return;
    this.setState({currentSong: songToPlay});
    this._clearSong();
    this._playSong(songToPlay);
  }

  _playSong(song) {
    this.howl = new Howl({
      urls: [song.url],
      volume: this.state.volume / 100,
      buffer: true,
      onload: () => {
        this.setState({
          duration: this.howl._duration,
          loading: false
        })
      },
      onend: () => {
        this._playNext()
      }
    }).play()
    this.setState({
      playing: true,
      displayTime: 0,
      loading: true
    });
    this.interval = setInterval(() => {
      this.setState({
        displayTime: this.howl.pos()
      })
    }, 1000)
  }
}
