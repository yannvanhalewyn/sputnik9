import React from 'react';
import { render } from 'react-dom';
import EntryForm from './components/entry_form.jsx';

var entry = {}
try {
  entry = JSON.parse(document.getElementById('entry-data').text)
} catch(err) {
  // Use a NullEntry
  var entry = {
    videos: [],
    performers: [],
    photos: {
      shown: [],
      hidden: []
    }
  }
}

$(document).ready(() => {
  render(<EntryForm entry={entry}/>, document.getElementById('react-entry-form'))
})
