import React from 'react'

export default class extends React.Component {
  render() {
    return <table className='unlock_codes_table table'>
      <Header />
      <Body codes={this.props.codes}/>
    </table>
  }
}

const HEADINGS = ['#', 'Code', 'Voor', 'Gebruik Door']

class Header extends React.Component {
  render() {
    return <thead className="thead-inverse">
      <tr>
        {HEADINGS.map(this._renderHeading)}
      </tr>
    </thead>
  }

  _renderHeading(heading) {
    return <th>{heading}</th>
  }
}

class Body extends React.Component {
  render() {
    return <tbody>
      {this.props.codes.map(this._renderEntry)}
    </tbody>
  }

  _renderEntry(entry, idx) {
    return <Entry idx={idx + 1} code={entry.code} to={entry.sent_to} activator={entry.activated_by} />
  }
}

class Entry extends React.Component {
  render() {
    return <tr className={this.props.activator ? "table-success" : ""}>
      <td>{this.props.idx}</td>
      <td><code>{this.props.code}</code></td>
      <td>{this.props.to}</td>
      <td>{this._activatorToString(this.props.activator)}</td>
    </tr>
  }

  _activatorToString(activator) {
    if (activator) {
      return `${activator.first_name} ${activator.last_name}`
    }
  }
}
