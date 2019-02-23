import React from 'react'
import App from '../src/App'
import Page from './Page'
import { mount } from 'enzyme'
import withStateLogger from './withStateLogger'
import { NullStorage, MemoryStorage } from './storages'

it('renders correctly', () => {
  const tree = mount(<App />)
  expect(tree.render()).toMatchSnapshot()
})

it('switch tabs correctly', () => {
  const tree = mount(<App />)
  const page = new Page(tree)

  const tab = page.tabs().at(1)
  tab.simulate('click')

  expect(tree.render()).toMatchSnapshot()
})

it('add tab', () => {
  withStateLogger(() => {
    const tree = mount(<App/>)
    const page = new Page(tree)

    const tabs = page.tabs()
    expect(tree).toContainMatchingElements(tabs.length, Page.TAB_SELECTOR)

    page.addTabButton().simulate('click')

    expect(tree).toContainMatchingElements(tabs.length + 1, Page.TAB_SELECTOR)
  })
})

it('remove tab', () => {
  const tree = mount(<App/>)
  const page = new Page(tree)

  const tabs = page.tabs()
  expect(tree).toContainMatchingElements(tabs.length, Page.TAB_SELECTOR)

  page.removeTabButton(0).simulate('click')

  expect(tree).toContainMatchingElements(tabs.length - 1, Page.TAB_SELECTOR)
})

it('switch tab', () => {
  const tree = mount(<App storage={NullStorage}/>)
  const page = new Page(tree)

  const tabs = page.tabs()
  expect(tabs.at(0)).toHaveProp('aria-selected', 'true')
  expect(tabs.at(1)).toHaveProp('aria-selected', 'false')

  tabs.at(1).simulate('click')

  const tabsAfterSwitch = page.tabs()
  expect(tabsAfterSwitch.at(0)).toHaveProp('aria-selected', 'false')
  expect(tabsAfterSwitch.at(1)).toHaveProp('aria-selected', 'true')
})

it('restore last active tab on reload', () => {
  const storage = new MemoryStorage()
  const tree = mount(<App storage={storage}/>)
  const page = new Page(tree)

  const tabs = page.tabs()
  tabs.at(1).simulate('click')

  const nextTree = mount(<App storage={storage}/>)
  const nextPage = new Page(nextTree)
  const nextTabs = nextPage.tabs()
  expect(nextTabs.at(0)).toHaveProp('aria-selected', 'false')
  expect(nextTabs.at(1)).toHaveProp('aria-selected', 'true')
})
