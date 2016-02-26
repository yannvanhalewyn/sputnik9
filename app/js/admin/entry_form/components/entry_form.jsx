import React from 'react'
import { FieldSet, TextArea, TextInput } from './form_elements.jsx'
import Videos from './videos.jsx'

export default class EntryForm extends React.Component {
  render() {
    let entry = this.props.entry
    return <form className='entry-form' method='post'>
      <TextInput label='Titel' name='title' val={entry.title}/>
      <Videos videos={entry.videos}/>
      <TextArea label='Blog' name='blog' val={entry.blog} rows={7} />
      <TextArea label='Lyrics' name='lyrics' val={entry.lyrics} rows={14} />
      <input type="submit" value="Opslaan" className='btn btn-success' />
    </form>
  }
}
