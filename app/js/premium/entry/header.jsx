import React from 'react'
import { Link, Router } from 'react-router';

// My apologies for the hack, out of time
var current_entry_idx = (pathname) => {
  let match = pathname.match("entries/([0-9])*");
  if (match) return match[1]
}

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
    let entry_idx = current_entry_idx(this.props.location.pathname)
    let current_entry = this.props.entries[entry_idx || 0]
    return (
      <div className="btn-group">
        <button className="dropdown-toggle current-entry__title" data-toggle="dropdown">{current_entry.title}</button>
        <ul className="entries-dropdown dropdown-menu">
          {this.props.entries.map(this._renderEntryLink.bind(this))}
        </ul>
      </div>
    )
  }

  _renderEntryLink(entry, i) {
    return <EntryTab id={i} title={entry.title} />
  }
}
