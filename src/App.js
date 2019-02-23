import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cookie from 'js-cookie'
import Tabs from './Tabs'

class App extends Component {
  static propTypes = {
    storage: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
  }

  static defaultProps = {
    storage: Cookie
  }

  render () {
    return <Tabs storage={this.props.storage}/>
  }
}

export default App
