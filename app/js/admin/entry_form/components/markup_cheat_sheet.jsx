import React from 'react'

export default class extends React.Component {
  render() {
    return <div>
      <table className='md-cheat-sheet text-muted' style={{'font-size': '0.8em'}}>
        <col span="2"/>
        <col span="10"/>
        <tr>
          <td>---</td>
          <td>Will break off to a new column</td>
        </tr>
        <tr>
          <td># This is a title</td>
          <td>Will style this as a heading</td>
        </tr>
      </table>
    </div>
  }
}
