import React from 'react'
import { FieldSet, TextArea, TextInput } from './form_elements.jsx'
import Videos from './videos.jsx'
import Performers from './performers.jsx'
import Photos from './photos.jsx'

export default class EntryForm extends React.Component {
  render() {
    let entry = this.props.entry
    return <form className='entry-form' method='post'>
      <h3>General</h3>
      <TextInput label='Titel' name='title' val={entry.title}/>
      <TextArea label='Blog' name='blog' val={entry.blog} rows={7} />
      <TextArea label='Lyrics' name='lyrics' val={entry.lyrics} rows={14} />
      <Videos videos={entry.videos}/>
      <Performers performers={entry.performers} />
      <Photos photos={entry.photos} />
      <input type="submit" value="Opslaan" className='btn btn-success' />
    </form>
  }
}
