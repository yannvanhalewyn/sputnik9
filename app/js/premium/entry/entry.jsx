import React from 'react';
import Header from './header.jsx';
import Videos from './videos.jsx';
import Blog from './blog.jsx'
import Performers from './performers.jsx';

export default class Entry extends React.Component {
  render() {
    return <div className='main'>

      <Header title={this.props.title} />
      <Videos videos={this.props.videos} />
      <Performers performers={this.props.performers} />
      <Blog title={this.props.title} text={this.props.blog.text} />

    </div>
  }
}
