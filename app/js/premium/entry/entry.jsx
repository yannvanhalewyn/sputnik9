import React from 'react';
import Header from './header.jsx';
import Videos from './videos.jsx';
import Blog from './blog.jsx';
import Artists from './artists.jsx';
import Gallery from './gallery.jsx';
import Lyrics from './lyrics.jsx';
import Performers from './performers.jsx';
import Contributors from './contributors.jsx';

export default class Entry extends React.Component {
  render() {
    return <div className='main'>
      <Header title={this.props.title} />
      <Videos videos={this.props.videos} />
      <Performers performers={this.props.performers} />
      <Blog title={this.props.title} text={this.props.blog.text} />
      <Artists title={this.props.title} artists={this.props.performers} />
      <Gallery photos={this.props.photos} />
      <Lyrics lyrics={this.props.lyrics} />
      <Contributors contributors={this.props.contributors} />
    </div>
  }
}
