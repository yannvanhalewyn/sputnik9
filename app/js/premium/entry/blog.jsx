import React from 'react'

export default class Blog extends React.Component {
  render() {
    return <div className="blog">
      <h3 className="title">{this.props.title}</h3>
      <div className="body">
        {this.props.text.split('\n').map(this._renderParagraph)}
        <p className='signature'>Lars</p>
      </div>
    </div>
  }

  _renderParagraph(text, i) {
    return <p key={`bodytext-${i}`} className="bodytext">{text}</p>
  }
}
