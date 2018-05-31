'use strict'

const showPensTemplate = require('../templates/pen.handlebars')
const status = require('../auth/status')

const createPenSuccess = function () {
  $('.status').text('You have successfully created a pen!')
  status.resetClearStatus()
  $('#myModalCreatePen').modal('toggle')
  $('input[type=text]').val('')
}

const createPenFailure = function () {
  $('.createPenMessage').text('Failed to create pen! Please try again')
  status.resetClearStatus()
}

const getPensSuccess = function (pens) {
  const getPensHTML = showPensTemplate({pens: pens})
  $('.pen-content').html(getPensHTML)
  if (pens.length === 0) {
    $('.pen-content').html('<h2>No pens were found</h2>')
  }
}

const getPensFailure = function () {
  $('.status').text('Failed to retrieve pens. No pens were found.')
  status.resetClearStatus()
}

const getUpdatePenSuccess = function (penId) {
  $('.status').text('You have successfully updated a pen!')
  status.resetClearStatus()
  const modalName = '#updateModal' + penId
  $(modalName).modal('toggle')
  $('input[type=text]').val('')
}

const getUpdatePenFailure = function () {
  $('.status').text('Failed to update pen. Something has gone wrong.')
  status.resetClearStatus()
}

const getDeletePenSuccess = function (penId) {
  $('.status').text('You have successfully deleted a pen!')
  status.resetClearStatus()
  const modalName = '#removeModal' + penId
  $(modalName).modal('toggle')
}

const getDeletePenFailure = function () {
  $('.status').text('Failed to delete pen. Something has gone wrong.')
  status.resetClearStatus()
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
