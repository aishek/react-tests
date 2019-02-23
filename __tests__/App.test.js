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

it('have two tabs on render, first active', () => {
  const tree = mount(<App/>)
  // debugger

  expect(tree).toIncludeText('Add tab')
  expect(tree).toIncludeText('Title 1')
  expect(tree).toIncludeText('Title 2')
  expect(tree).toIncludeText('Content 1')
  expect(tree).toIncludeText('Remove this tab (1)')
  expect(tree).not.toIncludeText('Content 2')
  expect(tree).not.toIncludeText('Remove this tab (2)')

  const tabs = tree.find('[data-test="tab"]')
  expect(tabs.length).toBe(2)

  const tabContents = tree.find('[data-test="tab-content"]')
  expect(tabContents.length).toBe(1)
})

it('remove first tab, second became active', () => {
  withStateLogger(() => {
    const tree = mount(<App/>)

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
    const tabs = tree.find('[data-test="tab"]')
    expect(tabs.length).toBe(1)
    const tabContents = tree.find('[data-test="tab-content"]')
    expect(tabContents.length).toBe(1)
  })
})

it('add tab, activate just added', () => {
  const tree = mount(<App/>)

  expect(tree).toIncludeText('Title 1')
  expect(tree).toIncludeText('Title 2')
  expect(tree).not.toIncludeText('Title 3')
  expect(tree).toIncludeText('Content 1')
  expect(tree).not.toIncludeText('Content 2')
  const tabs = tree.find('[data-test="tab"]')
  expect(tabs.length).toBe(2)
  const tabContents = tree.find('[data-test="tab-content"]')
  expect(tabContents.length).toBe(1)

  const addTabButton = tree.find('[data-test="add-tab"]')
  addTabButton.simulate('click')

  expect(tree).toIncludeText('Title 3')
  const tabsAfterAdd = tree.find('[data-test="tab"]')
  expect(tabsAfterAdd.length).toBe(3)
  const justAddedTab = tabsAfterAdd.at(2)
  justAddedTab.simulate('click')
  expect(tree).not.toIncludeText('Content 1')
  expect(tree).not.toIncludeText('Content 2')
  expect(tree).toIncludeText('Content 3')
})
