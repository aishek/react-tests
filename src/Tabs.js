import React, { PureComponent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PropTypes from 'prop-types'
import 'react-tabs/style/react-tabs.css'

export default class TabsExample extends PureComponent {
  static propTypes = {
    storage: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
  }

  constructor (props) {
    super(props)

    const selectedTabFromStorage = this.props.storage.get('selected_tab')
    const selectedTab = typeof selectedTabFromStorage === 'undefined' ? null : parseInt(selectedTabFromStorage)

    this.state = {
      tabs: [
        {
          id: 1,
          tab: 'Title 1',
          content: 'Content 1'
        },
        {
          id: 2,
          tab: 'Title 2',
          content: 'Content 2'
        }
      ],
      selectedTab
    }
    this.maxTabNumber = 2
  }

  render () {
    return (
      <div>
        <button onClick={this.handleAddTabClick} data-test="add-tab">Add tab</button>
        <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.selectedTab}>
          <TabList>
            {this.state.tabs.map(({ tab, id }) => (
              <Tab key={id} data-test="tab">
                {tab}
              </Tab>
            ))}
          </TabList>

          {this.state.tabs.map(({ content, id }) => (
            <TabPanel key={id}>
              <div data-test="tab-content">
                {content}
                <button onClick={() => this.handleRemoveTabClick(id)} data-test="remove-tab">Remove this tab ({id})</button>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    )
  }

  handleTabSelect = index => {
    this.props.storage.set('selected_tab', index)
    this.setState({ selectedIndex: index })
  }

  handleAddTabClick = () => {
    this.setState(prevState => {
      const id = this.maxTabNumber + 1

      const tabs = [
        ...prevState.tabs,
        {
          id,
          tab: `Title ${id}`,
          content: `Content ${id}`
        }
      ]
      return {
        ...prevState,
        tabs
      }
    }, () => (this.maxTabNumber += 1))
  }

  handleRemoveTabClick (id) {
    this.setState(prevState => {
      const index = prevState.tabs.findIndex(tab => tab.id === id)
      const tabs = [
        ...prevState.tabs.slice(0, index),
        ...prevState.tabs.slice(index + 1)
      ]
      return {
        ...prevState,
        tabs
      }
    })
  }
}
