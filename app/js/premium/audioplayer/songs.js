var json = document.getElementById('songs-data').text
var songs = []
try {
  songs = JSON.parse(json)
} catch(err) {
  console.error('could not parse songs data')
}

module.exports = songs
