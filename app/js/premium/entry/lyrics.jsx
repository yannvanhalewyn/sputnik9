import React from 'react'
import * as Markdown from '../util/markdown'

class Column extends React.Component {
  render() {
    return <div>
      {this.props.statements.map(this._renderStatement)}
    </div>
  }

  _renderStatement(statement, i) {
    switch(statement.type) {
      case 'header':
        return <span className="md-title">{statement.value}<br/></span>
      default:
        return <span>{statement.value}<br/></span>
    }
  }
}

export default class Lyrics extends React.Component {
  render() {
    var tree = Markdown.parse(this.props.lyrics)
    let grid = `col-md-${12/tree.length}`

    return <div className="lyrics">
      <h3 className="title">Lyrics</h3>
      <div className="body row">
        {tree.map((column, i) => {
          return <div className={grid}>
            <Column key={i} statements={column} />
          </div>
        })}
      </div>
    </div>
  }
}
