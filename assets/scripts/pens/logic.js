'use strict'

const store = require('../store.js')

const storePen = function storePen (data) {
  // accept data formatted with web form, return data formatted for ajax
  // convert isInked and isClean to Booleans
  data.pen.isInked = !!data.pen.isInked
  data.pen.isClean = !!data.pen.isClean
  // if a date was entered, convert that date
  // form input is a string like "2018-05-30"
  if (data.pen.changedOn) {
    data.pen.changedYear = data.pen.changedOn.slice(0, 4) * 1
    data.pen.changedMonth = data.pen.changedOn.slice(5, 7) * 1
    data.pen.changedDay = data.pen.changedOn.slice(8) * 1
  }
  console.log('data in storePen')
  console.log(data)
  return data
}

const displayPens = function displayPens (data) {
  // accept an array of pens formatted from Express
  // return array of pens formatted for handlebars
  // data.pages.forEach(function (page) {
  //   if (page.owner === store.user._id) {
  //     myPages.push(page)
  //   }
  // })
  store.pens = data.pens
  console.log(store.pens)
}

module.exports = {
  storePen,
  displayPens
}
