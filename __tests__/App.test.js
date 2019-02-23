import React from 'react'
import App from '../src/App'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const tree = mount(<App />)
  expect(tree).toMatchSnapshot()
})

it('switch tabs correctly', () => {
  const tree = mount(<App />)

  const tab = tree.find('[data-test-name="second-tab"]')
  tab.simulate('click')

  expect(tree).toMatchSnapshot()
})
