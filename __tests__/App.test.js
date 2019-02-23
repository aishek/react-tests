import React from 'react'
import App from '../src/App'
import { mount } from 'enzyme'
import withStateLogger from './withStateLogger'

it('renders correctly', () => {
  const tree = mount(<App />)
  expect(tree.render()).toMatchSnapshot()
})

it('switch tabs correctly', () => {
  const tree = mount(<App />)

  const tab = tree.find('[data-test="tab"]').at(1)
  tab.simulate('click')

  expect(tree.render()).toMatchSnapshot()
})

it('remove first tab, second became active', () => {
  withStateLogger(() => {
    const tree = mount(<App/>)

    // debugger

    expect(tree).toIncludeText('Title 1')
    expect(tree).toIncludeText('Title 2')
    expect(tree).toIncludeText('Content 1')
    expect(tree).toIncludeText('Remove this tab (1)')
    expect(tree).not.toIncludeText('Content 2')
    expect(tree).not.toIncludeText('Remove this tab (2)')

    const removeFirstTabButton = tree.find('[data-test="remove-tab"]')
    removeFirstTabButton.simulate('click')

    expect(tree).not.toIncludeText('Title 1')
    expect(tree).toIncludeText('Title 2')
    expect(tree).not.toIncludeText('Content 1')
    expect(tree).not.toIncludeText('Remove this tab (1)')
    expect(tree).toIncludeText('Content 2')
    expect(tree).toIncludeText('Remove this tab (2)')
  })
})

it('add tab', () => {
  const tree = mount(<App/>)

  expect(tree).toIncludeText('Title 1')
  expect(tree).toIncludeText('Title 2')
  expect(tree).not.toIncludeText('Title 3')

  const addTabButton = tree.find('[data-test="add-tab"]')
  addTabButton.simulate('click')

  expect(tree).toIncludeText('Title 3')
})
