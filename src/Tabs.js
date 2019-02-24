import React, { PureComponent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PropTypes from 'prop-types'
import 'react-tabs/style/react-tabs.css'
import getRSSItems from './getRSSItems'

export default class TabsExample extends PureComponent {
  static propTypes = {
    storage: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
  }

  constructor (props) {
    super(props)

    const selectedTabFromStorage = this.props.storage.get('selected_tab')
    const selectedTab = typeof selectedTabFromStorage === 'undefined' ? 0 : parseInt(selectedTabFromStorage)

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
      selectedTab,
      url: ''
    }
    this.maxTabNumber = 2
  }

  render () {
    return (
      <div>
        <button onClick={this.handleAddTabClick} data-test="add-tab">Add tab</button>
        <Tabs onSelect={this.handleTabSelect} selectedIndex={this.state.selectedTab}>
          <TabList data-test="tabs-box">
            {this.state.tabs.map(({ tab, id }) => (
              <Tab key={id} data-test="tab">
                {tab}
              </Tab>
            ))}
          </TabList>

          {this.state.tabs.map(({ content, id }) => (
            <TabPanel key={id}>
              <div data-test="tab-content">
                <div dangerouslySetInnerHTML={ { __html: content } }/>
                <button onClick={() => this.handleRemoveTabClick(id)} data-test="remove-tab">Remove this tab ({id})</button>
              </div>
            </TabPanel>
          ))}
        </Tabs>

        <div>
          <input type="text" onChange={this.handleURLChange} value={this.state.url} placeholder="RSS URL" data-test="rss-url"/>
          <button onClick={this.handleGrabRSSClick} data-test="grab-rss">Grab RSS</button>
        </div>
      </div>
    )
  }

  handleURLChange = event => {
    const url = event.target.value
    this.setState({ url })
  }

  handleGrabRSSClick = () => {
    const { url } = this.state

    getRSSItems(url).then(items => {
      this.setState(prevState => {
        const id = this.maxTabNumber + 1
        const tab = {
          id,
          tab: url,
          content: items.map(({ title }) => `<h2>${title}</h2>`).join('')
        }

        return {
          ...prevState,
          tabs: [
            ...prevState.tabs,
            tab
          ]
        }
      }, () => (this.maxTabNumber += 1))
    })
  }

  handleTabSelect = index => {
    this.props.storage.set('selected_tab', index)
    this.setState({ selectedTab: index })
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
