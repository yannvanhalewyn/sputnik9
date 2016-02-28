import React from 'react';

export class FieldSet extends React.Component {
  render() {
    return <fieldset className={`form-group`}>
      <label htmlFor={this.props.name}>{this.props.label}</label>
      {this.props.children}
    </fieldset>
  }
}

export class TextInput extends React.Component {
  render() {
    return <FieldSet {...this.props}>
      <input
        className='form-control'
        defaultValue={this.props.val}
        id={this.props.name} type='text' name={this.props.name} />
    </FieldSet>
  }
}

export class TextArea extends React.Component {
  render() {
    return <FieldSet {...this.props} >
      <textarea
        className='form-control'
        id={this.props.name}
        name={this.props.name}
        rows={this.props.rows}
        defaultValue={this.props.val}
      />
      {this.props.children}
    </FieldSet>
  }
}
