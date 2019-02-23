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

it('add tab', () => {
  withStateLogger(() => {
    const tree = mount(<App/>)

    const tabs = tree.find('li[data-test="tab"]')
    expect(tree).toContainMatchingElements(tabs.length, 'li[data-test="tab"]')

    tree.find('[data-test="add-tab"]').simulate('click')

    expect(tree).toContainMatchingElements(tabs.length + 1, 'li[data-test="tab"]')
  })
})

it('remove tab', () => {
  const tree = mount(<App/>)

  const tabs = tree.find('li[data-test="tab"]')
  expect(tree).toContainMatchingElements(tabs.length, 'li[data-test="tab"]')

  tree.find('[data-test="remove-tab"]').at(0).simulate('click')

  expect(tree).toContainMatchingElements(tabs.length - 1, 'li[data-test="tab"]')
})

it('switch tab', () => {
  const tree = mount(<App/>)

  const tabs = tree.find('li[data-test="tab"]')
  expect(tabs.at(0)).toMatchSelector('[aria-selected="true"]')
  expect(tabs.at(1)).toMatchSelector('[aria-selected="false"]')

  tabs.at(1).simulate('click')

  const tabsAfterSwitch = tree.find('li[data-test="tab"]')
  expect(tabsAfterSwitch.at(0)).toMatchSelector('[aria-selected="false"]')
  expect(tabsAfterSwitch.at(1)).toMatchSelector('[aria-selected="true"]')
})
