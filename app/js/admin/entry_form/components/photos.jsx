import React from 'react'
import { FieldSet, TextArea, TextInput } from './form_elements.jsx'

export default class Photos extends React.Component {
  render() {
    return <div>
      <h3>Foto's</h3>
      <p>Voer hieronder een lijst van Cloudinary foto ID's gescheiden door een nieuwe lijn.</p>
      <TextArea label="Klikbare foto's" name='photos[shown]' val={this.props.photos.shown} rows='4' />
      <TextArea label="Verborgen foto's" name='photos[hidden]' val={this.props.photos.hidden} rows='10'/>
    </div>
  }
}
