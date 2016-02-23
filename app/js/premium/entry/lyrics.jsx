import React from 'react'

export default class Lyrics extends React.Component {
  render() {
    var columns = this.props.lyrics.split('\n\n\n')
    return <div className="lyrics">
      <h3 className="title">Lyrics</h3>
      <div className="body row">
        {columns.map(this._renderColumn.bind(this))}
        <div className="col-md-6">
        </div>
      </div>
    </div>
  }

  _renderColumn(column, i) {
    var paragraphs = column.split('\n\n')
    return <div key={i} className="col-md-6">
      {paragraphs.map(this._renderParagraph)}
    </div>
  }

  _renderParagraph(paragraph, i) {
    var sentences = paragraph.split('\n')
    return <span key={i}>
      {sentences.map((s, i) => <span key={i}>{s}<br/></span>)}
      <br/>
    </span>
  }
}
