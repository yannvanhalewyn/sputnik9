import React from 'react'

export default class extends React.Component {
  render() {
    return <table className='md-cheat-sheet text-muted' style={{'fontSize': '0.8em'}}>
      <tbody>
        <tr>
          <td>---</td>
          <td>Will break off to a new column</td>
        </tr>
        <tr>
          <td># This is a title</td>
          <td>Will style this as a heading</td>
        </tr>
      </tbody>
    </table>
  }
}
