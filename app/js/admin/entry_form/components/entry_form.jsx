import React from 'react'
import { FieldSet, TextArea, TextInput } from '../../util/form_elements.jsx'
import Videos from './videos.jsx'
import Performers from './performers.jsx'
import Photos from './photos.jsx'
import MarkupCheatSheet from './markup_cheat_sheet.jsx'

export default class EntryForm extends React.Component {
  render() {
    let entry = this.props.entry
    return <form className='entry-form' method='post' action={entry._id ? '' : '/admin/entries'}>
      <h3>General</h3>
      <TextInput label='Titel' name='title' val={entry.title}/>
      <TextArea label='Blog' name='blog' val={entry.blog} rows={7} />
      <TextArea label='Lyrics' name='lyrics' val={entry.lyrics} rows={14} >
        <MarkupCheatSheet />
      </TextArea>
      <TextArea label='Contributors' name='contributors' val={entry.contributors} rows='12' >
        <MarkupCheatSheet />
      </TextArea>
      <Videos videos={entry.videos}/>
      <Performers performers={entry.performers} />
      <Photos photos={entry.photos} />
      <input type="submit" value="Opslaan" className='btn btn-success' />
      <button className='btn btn-warning' onClick={this._previewClicked}>Preview deze entry!</button>
    </form>
  }

  _previewClicked(e) {
    e.preventDefault();
    $.post('/admin/entries/preview', $('form').serialize(), (res) => {
      let win = window.open('about:blank');
      if (!win) return alert('Please enable pup-ups buddy!')
      win.document.write(res);
      win.document.close();
    })
  }
}
