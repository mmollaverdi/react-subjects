////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to <App> that sets `this.state.radioValue` to a pre-determined
//   value, like "tape"
// - Make the <RadioGroup> update accordingly
//
// Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
// the <RadioOption>s so the keyboard will work)
//
// - Enter and space bar should select the option
// - Arrow right, arrow down should select the next option
// - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div
        style={{
          borderColor: '#ccc',
          borderSize: '3px',
          borderStyle: this.props.isSelected ? 'inset' : 'outset',
          height: 16,
          width: 16,
          display: 'inline-block',
          cursor: 'pointer',
          background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
        }}
      />
    )
  }
}

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  }

  state = {
    value: this.props.defaultValue
  }

  select = value => {
    this.setState({ value }, () => {
      this.props.onChange(this.state.value)
    })
  }

  getSelectedValue = () => this.state.value

  render() {
    const RadioOption = ({ value, children }) => (
      <TheRealRadioOption value={value} getSelectedValue={this.getSelectedValue} onClick={this.select}>
        {children}
      </TheRealRadioOption>
    )
    RadioOption.propTypes = {
      value: PropTypes.string
    }

    return <div>{this.props.children(RadioOption)}</div>
  }
}

class TheRealRadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    getSelectedValue: PropTypes.func.isRequired
  }

  render() {
    return (
      <div onClick={() => this.props.onClick(this.props.value)}>
        <RadioIcon isSelected={this.props.value === this.props.getSelectedValue()}/> {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    radioValue: 'fm'
  }

  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <h2>Radio Value: {this.state.radioValue}</h2>

        <RadioGroup
          defaultValue={this.state.radioValue}
          onChange={(radioValue) => this.setState({ radioValue })}
        >
          {
            RadioOption => (<div>
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
            </div>)
          }
        </RadioGroup>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
