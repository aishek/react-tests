import React from 'react'
import { readFileSync } from 'fs'
import delay from 'delay'
import App from '../src/App'
import Page from './Page'
import { mount } from 'enzyme'
import withStateLogger from './withStateLogger'
import { NullStorage, MemoryStorage } from './storages'
import nock from 'nock'

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
    expect(page.tabsBox()).toContainMatchingElements(tabs.length, Page.TAB_SELECTOR)

    page.addTabButton().simulate('click')

    expect(page.tabsBox()).toContainMatchingElements(tabs.length + 1, Page.TAB_SELECTOR)
  })
})

it('remove tab', () => {
  const tree = mount(<App/>)
  const page = new Page(tree)

  const tabs = page.tabs()
  expect(page.tabsBox()).toContainMatchingElements(tabs.length, Page.TAB_SELECTOR)

  page.removeTabButton(0).simulate('click')

  expect(page.tabsBox()).toContainMatchingElements(tabs.length - 1, Page.TAB_SELECTOR)
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

it('fetch rss and create tab for it', async () => {
  const tree = mount(<App storage={NullStorage}/>)
  const page = new Page(tree)

  const xml = readFileSync('__tests__/__fixtures__/rss.xml', { encoding: 'utf8' })
  nock('https://bureau.ru')
    .get('/news/rss/')
    .reply(200, xml)

  const tabsBeforeCreate = page.tabs()

  page.RSSURLInput().simulate('change', { target: { value: 'https://bureau.ru/news/rss/' } })
  page.GrabRSSButton().simulate('click')
  await delay(100)
  tree.update()

  const tabs = page.tabs()
  expect(page.tabsBox()).toContainMatchingElements(tabsBeforeCreate.length + 1, Page.TAB_SELECTOR)
  expect(tabs.at(tabsBeforeCreate.length)).toHaveText('https://bureau.ru/news/rss/')

  tabs.at(tabsBeforeCreate.length).simulate('click')
  expect(tree).toIncludeText('Победитель Новогоднего чемпионата оленеводов — 2019 Сергей Колесников награждён годовой подпиской на книгу «Путешествие в шахматное королевство».')
  expect(tree).toIncludeText('Юрий Мазурский рассказал в «Техноведре» о «сеточности» на сайте бюро.')
  expect(tree).toIncludeText('Артём Горбунов написал в Фейсбуке о ближайшем наборе в Школу бюро.')
})
