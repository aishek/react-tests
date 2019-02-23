import React from 'react'
import App from '../src/App'
import { mount } from 'enzyme'

it('renders correctly', () => {
  const tree = mount(<App />)
  expect(tree).toMatchSnapshot()
})

it('switch tabs correctly', () => {
  const tree = mount(<App />)

  tree
    .find('[role="tab"]').filterWhere(node => node.text() === 'Title 2')
    .simulate('click')
  expect(tree).toMatchSnapshot()
})
