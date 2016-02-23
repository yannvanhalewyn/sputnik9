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

  _renderColumn(column) {
    var paragraphs = column.split('\n\n')
    return <div className="col-md-6">
      {paragraphs.map(this._renderParagraph)}
    </div>
  }

  _renderParagraph(paragraph) {
    var sentences = paragraph.split('\n')
    return <span>
      {sentences.map(s => <span>{s}<br/></span>)}
      <br/>
    </span>
  }
}
