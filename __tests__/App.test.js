import React from 'react'
import App from '../src/App'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const tree = mount(<App />)
  expect(tree).toMatchSnapshot()
})

it('switch tabs correctly', () => {
  const tree = mount(<App />)

  const tabs = tree.find('[role="tab"]')
  const tab = tabs.filterWhere(node => node.text() === 'Title 2')
  tab.simulate('click')

  expect(tree).toMatchSnapshot()
})
