import React from 'react'

class Contribution extends React.Component {
  render() {
    return <div className="col-md-4">
      <p><span className="contribution-name">{this.props.title}:</span><br/><br/>
        {this.props.body.split('\n').map((s, i) => <span key={i}>{s}<br/></span>)}
      </p>
    </div>
  }
}

export default class Contributors extends React.Component {
  render() {
    return <div className="contributors">
      <h3 className="title">Contributors</h3>
      <div className="body row">
        {this.props.contributors.map(this._renderContribution)}
      </div>
    </div>
  }

  _renderContribution(contribution, i) {
    return <Contribution key={i} title={contribution.title} body={contribution.body} />
  }
}
