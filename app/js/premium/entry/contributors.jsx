import React from 'react'
import * as Markdown from '../util/markdown'

class Column extends React.Component {
  render() {
    return <p>
      {this.props.statements.map(this._renderStatement)}
    </p>
  }

  _renderStatement(statement, i) {
    switch(statement.type) {
      case 'header':
        return <span className="contribution-name">{statement.value}<br/></span>
      default:
        return <span>{statement.value}<br/></span>
    }
  }
}

export default class Contributors extends React.Component {
  render() {
    let tree = Markdown.parse(this.props.contributors)
    let grid = `col-md-${12/tree.length}`
    return <div className="contributors">
      <h3 className="title">Contributors</h3>
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
