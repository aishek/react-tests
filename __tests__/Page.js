export default class Page {
  constructor (tree) {
    this.tree = tree
  }

  static TAB_SELECTOR = 'li[data-test="tab"]'

  tabs = () => this.tree.find(this.constructor.TAB_SELECTOR)
  tabsBox = () => this.tree.find('ul[data-test="tabs-box"]')
  addTabButton = () => this.tree.find('[data-test="add-tab"]')
  removeTabButton = (index) => this.tree.find('[data-test="remove-tab"]').at(index)
  RSSURLInput = () => this.tree.find('[data-test="rss-url"]')
  GrabRSSButton = () => this.tree.find('[data-test="grab-rss"]')
}
