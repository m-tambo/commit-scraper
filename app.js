const express = require('express')
const rp = require('request-promise')
const cheerio = require('cheerio')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4040
const app = express()

app.use(bodyParser.json())

app.get('/:thisuser', ({params: {thisuser}}, res, next) => {
  rp({
  uri: `https://github.com/${thisuser}`
})
  .then((html) => {
    // console.log(`html: ${html}`)
    let commitCount = []
    let $ = cheerio.load(html)
    $('div.js-contribution-graph h2').each(function(){
      let data = $(this)
      commitCount.push(data.text().replace(/\D+/g, ''))
    })
    // console.log(commitCount)
    res.json(commitCount)
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
