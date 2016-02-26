export function parse(md) {
  var title_rx = /^# \w+/
  var column_rx = /--+/
  return md.split(column_rx).map(columns => {
    return columns.trim().split('\r\n').map(value => {
      var type = 'text';
      if (title_rx.test(value)) type = 'header'
      return {type, value}
    })
  })
}
