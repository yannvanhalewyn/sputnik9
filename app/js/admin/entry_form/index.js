import React from 'react';
import { render } from 'react-dom';
import EntryForm from './components/entry_form.jsx';

var entry = {}
try {
  entry = JSON.parse(document.getElementById('entry-data').text)
} catch(err) {
  console.error('Could not parse entry data')
}

$(document).ready(() => {
  render(<EntryForm entry={entry}/>, document.getElementById('react-entry-form'))
})
