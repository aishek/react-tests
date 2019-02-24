import Parser from 'rss-parser'

async function getRSSItems (url) {
  const feed = await (new Parser()).parseURL(url)
  return feed.items
}

export default getRSSItems
