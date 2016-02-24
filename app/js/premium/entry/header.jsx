import React from 'react'

export default class Header extends React.Component {
  render() {
    return <div className="main-heading">
      <img className="bolts-left" src="/img/scroll-bolts-left.png" alt="" />
      <h1 className="title">{this.props.title}</h1>
      <img className="bolts-right" src="/img/scroll-bolts-right.png" alt="" />
    </div>
  }
}
