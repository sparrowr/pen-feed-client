'use strict'

const showPensTemplate = require('../templates/pen.handlebars')

const createPenSuccess = function () {
  $('.status').text('You have successfully created a pen!')
  setTimeout(() => $('.status').text(''), 2000)
  $('#myModalCreatePen').modal('toggle')
  $('input[type=text]').val('')
}

const createPenFailure = function () {
  $('.createPenMessage').text('Failed to create pen! Please try again')
  setTimeout(() => $('.status').text(''), 2000)
}

const getPensSuccess = function (pens) {
  console.log('getPensSuccess')
  console.log(pens)
  const getPensHTML = showPensTemplate({pens: pens})
  $('.pen-content').html(getPensHTML)
  if (pens.length === 0) {
    $('.pen-content').html('<h2>No pens were found</h2>')
  }
}

const getPensFailure = function () {
  $('.status').text('Failed to retrieve pens. No pens were found.')
}

const getUpdatePenSuccess = function (penId) {
  $('.status').text('You have successfully updated a pen!')
  setTimeout(() => $('.status').text(''), 2000)
  const modalName = '#updateModal' + penId
  $(modalName).modal('toggle')
  $('input[type=text]').val('')
}

const getUpdatePenFailure = function () {
  $('.status').text('Failed to update pen. Something has gone wrong.')
}

const getDeletePenSuccess = function () {
  $('.status').text('You have successfully deleted a pen!')
  setTimeout(() => $('.status').text(''), 2000)
}

const getDeletePenFailure = function () {
  $('.status').text('Failed to delete pen. Something has gone wrong.')
}

module.exports = {
  createPenSuccess,
  createPenFailure,
  getPensSuccess,
  getPensFailure,
  getUpdatePenSuccess,
  getUpdatePenFailure,
  getDeletePenSuccess,
  getDeletePenFailure
}
