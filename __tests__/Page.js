export default class Page {
  constructor (tree) {
    this.tree = tree
  }

  static TAB_SELECTOR = 'li[data-test="tab"]'

  tabs () {
    return this.tree.find(Page.TAB_SELECTOR)
  }

  addTabButton () {
    return this.tree.find('[data-test="add-tab"]')
  }

  removeTabButton (index) {
    return this.tree.find('[data-test="remove-tab"]').at(index)
  }
}
