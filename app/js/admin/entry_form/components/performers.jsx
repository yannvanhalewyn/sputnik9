import React from 'react'
import { FieldSet, TextArea, TextInput } from './form_elements.jsx'

class Performer extends React.Component {
  render() {
    return <div>
      <div className="row">
        <div className="col-md-4">
          <TextInput name={`performers[${this.props.idx}][name]`} label='Naam' val={this.props.name}/>
        </div>
        <div className="col-md-4">
          <TextInput name={`performers[${this.props.idx}][instrument]`} label='Instrument' val={this.props.instrument}/>
        </div>
        <div className="col-md-4">
          <TextInput name={`performers[${this.props.idx}][thumb_id]`} label='Cloudinary foto id' val={this.props.thumb_id}/>
        </div>
      </div>
      <TextArea name={`performers[${this.props.idx}][about]`} label='About' val={this.props.about} rows='4'>
        <small className="text-muted">* Laat dit veld leeg als je hem niet in de "Artists" sectie wil.</small>
      </TextArea>
      <button
        onClick={this.props.onDelete}
        className="btn btn-danger delete">
        Verwijderen
      </button>
      <hr/>
    </div>
  }
}

export default class Performers extends React.Component {
  constructor(props) {
    super()
    this.state = {performers: props.performers}
  }

  render() {
    return <div>
      <h3>Performer's <button onClick={this._addPerformer.bind(this)} className="btn btn-success" >+</button>
      </h3>
      {this.state.performers.map(this._renderPerformer.bind(this))}
    </div>
  }

  _renderPerformer(performer, i) {
    return <Performer idx={i} key={performer._id} {...performer}/>
  }

  _addPerformer() {

  }
}
