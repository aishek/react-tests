import React, { PureComponent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

export default class TabsExample extends PureComponent {
  constructor (props) {
    super(props)

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
      ]
    }
    this.maxTabNumber = 2
  }

  render () {
    return (
      <div>
        <button onClick={this.handleAddTabClick} data-test="add-tab">Add tab</button>
        <Tabs>
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
