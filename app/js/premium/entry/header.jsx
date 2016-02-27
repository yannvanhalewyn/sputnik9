import React from 'react'
import { Link } from 'react-router';

class EntryTab extends React.Component {
  render() {
    return <Link to={`entries/${this.props.id}`} activeClassName='active'>
      <li>
        <img className='bolts-left' src='/img/scroll-bolts-left.png' />
        <h1 className='title'>{this.props.title}</h1>
        <img className='bolts-right' src='/img/scroll-bolts-right.png' />
      </li>
    </Link>
  }
}

export default class Header extends React.Component {
  render() {
    return <ul className="entries-header">
      {this.props.entries.map(this._renderEntryLink.bind(this))}
    </ul>
  }

  _renderEntryLink(entry, i) {
    return <EntryTab id={i} title={entry.title} />
  }
}
