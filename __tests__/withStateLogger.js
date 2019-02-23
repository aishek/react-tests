/* global React */

const withStateLogger = (block) => {
  const stateLogger = console.log
  const setState = React.PureComponent.prototype.setState
  React.PureComponent.prototype.setState = function (nextState) {
    stateLogger('Name: ', this.constructor.name)
    stateLogger('Old state: ', this.state)
    setState.apply(this, [
      nextState,
      () => {
        stateLogger('New state: ', this.state)
      }
    ])
  }

  block.call()

  React.PureComponent.prototype.setState = setState
}

export default withStateLogger
