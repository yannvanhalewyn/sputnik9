var ToggleElement = (id) => {
  return {
    id: id,
    target: $(`#${id}`),
    toggle: $(`[data-togglefor=${id}]`)
  }
}

var toggle_on = e => { e.target.show(); e.toggle.addClass('active') }
var toggle_off = e => { e.target.hide(); e.toggle.removeClass('active') }
var elements = [ ToggleElement('oea'), ToggleElement('get-by') ]

$('[data-togglefor]').on('click', (event) => {
  elements.map(e => {
    if (e.id == event.target.dataset.togglefor) toggle_on(e)
    else toggle_off(e)
  })
})
