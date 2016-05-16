import React from 'react'
import { Link, Router } from 'react-router';

// My apologies for the hack, out of time
var current_entry_idx = (pathname) => {
  let match = pathname.match("entries/([0-9])*");
  if (match) return match[1]
}

class EntryTab extends React.Component {
  render() {
    return <li>
      <Link className="header__entry" to={`entries/${this.props.id}`} activeClassName='active'>
        {this.props.title}
      </Link>
    </li>
  }
}

export default class Header extends React.Component {
  render() {
    let entry_idx = current_entry_idx(this.props.location.pathname)
    let current_entry = this.props.entries[entry_idx || 0]
    return (
      <div className="btn-group">
        <img className="header__bolt-left" src='/img/scroll-bolts-left.png' />
        <button className="dropdown-toggle header__entry-dropdown-toggle" data-toggle="dropdown">{current_entry.title}</button>
        <img className="header__bolt-right" src='/img/scroll-bolts-right.png' />
        <ul className="header__entries-dropdown dropdown-menu">
          {this.props.entries.map(this._renderEntryLink.bind(this))}
        </ul>
      </div>
    )
  }

  _renderEntryLink(entry, i) {
    return <EntryTab id={i} title={entry.title} />
  }
}
