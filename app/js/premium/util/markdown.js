export function parse(md) {
  var title_rx = /^# (.+)/
  var column_rx = /\r\n---+/
  return md.split(column_rx).map(columns => {
    return columns.trim().split('\r\n').map(value => {
      var type = 'text';
      if (title_rx.test(value)) {
        type = 'header'
        value = title_rx.exec(value)[1]
      }
      return {type, value}
    })
  })
}
