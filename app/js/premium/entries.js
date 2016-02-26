var json = document.getElementById('entries-data').text
var entries = []
try {
  entries = JSON.parse(json)
} catch(err) {
  console.error('could not parse entry data')
}
module.exports = entries
