import React from 'react';
import Videos from './videos.jsx';
import Performers from './performers.jsx';
import Blog from './blog.jsx';
import Artists from './artists.jsx';
import Gallery from './gallery.jsx';
import Lyrics from './lyrics.jsx';
import Contributors from './contributors.jsx';
import entries from '../entries';

class Entry extends React.Component {
  render() {
    return <div>
      <Videos videos={this.props.entry.videos} />
      <Performers performers={this.props.entry.performers} />
      <Blog title={this.props.entry.title} text={this.props.entry.blog.text} />
      <Gallery photos={this.props.entry.photos} />
      <Artists title={this.props.entry.title} artists={this.props.entry.performers} />
      <Lyrics lyrics={this.props.entry.lyrics} />
      <Contributors contributors={this.props.entry.contributors} />
    </div>
  }
}

export default class EntryHandler extends React.Component {
  render() {
    return <Entry entry={entries[this.props.params.entryId] || entries[0]} />
  }
}
