import React from 'react';

export default class Song extends React.Component {
  render() {
    var classes = `track ${this.props.active ? "active" : ""}`

    return (
      <li className={classes} onClick={this._onClick.bind(this)}>
        <img className='playicon' src='img/musicplay.png' alt='Play Icon' />
        <h4 className='title'>{this.props.title}</h4>
        <p className='subtitle'>{this.props.subtitle}</p>
        <div className='trackdevide'></div>
      </li>
    )
  }

  _onClick() {
    this.props.onClick(this.props.id);
  }
}
