import React from 'react';
import { render } from 'react-dom';
import SongsForm from './components/songs_form.jsx';

var songs = []
try {
  songs = JSON.parse(document.getElementById('songs-data').text)
} catch(err) {
  console.error('Could not parse songs data')
}

$(document).ready(() => {
  render(<SongsForm songs={songs}/>, document.getElementById('react-songs-form'))
})
