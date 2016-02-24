import React from 'react'
import { cl_thumb } from '../util/cloudinary.jsx'

class Performer extends React.Component {
  render() {
    return <li className='performer'>
      <img src={cl_thumb(this.props.thumb_id)} className="thumb" />
      <div className='info'>
        <span className='name'>{this.props.name}</span>
        <span className='instrument'>{this.props.instrument}</span>
      </div>
    </li>
  }
}

export default class extends React.Component {
  render() {
    return <ul className='performers'>
      {this.props.performers.map(this._renderPerformer)}
    </ul>
  }

  _renderPerformer(performer) {
    return <Performer
      name={performer.name}
      key={performer.thumb_id}
      instrument={performer.instrument}
      thumb_id={performer.thumb_id}
    />
  }
}
