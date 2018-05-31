'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const logic = require('./logic')

const onCreatePen = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const penData = logic.storePen(data)
  api.createPen(penData)
    .then(ui.createPenSuccess)
    .then(() => onGetPens(event))
    .catch(ui.createPenFailure)
}

const autoGetPens = function autoGetPens () {
  api.getPens()
    .then(logic.displayPens)
    .then(ui.getPensSuccess)
    .catch(ui.getPensFailure)
}

const onGetPens = (event) => {
  event.preventDefault()
  autoGetPens()
}

const onUpdatePens = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const penId = $(event.target).data('id')
  const penData = logic.storePen(data)
  api.updatePens(penData, penId)
    .then(ui.getUpdatePenSuccess(penId))
    .then(() => onGetPens(event))
    .catch(ui.getUpdatePenFailure)
}

const onDeletePen = (event) => {
  event.preventDefault()
  const penId = $(event.target).data('id')
  api.deletePen(penId)
    .then(ui.getDeletePenSuccess(penId))
    .then(() => onGetPens(event))
    .catch(ui.getDeletePenFailure)
}

const addHandlers = () => {
  $('#create-pen').on('submit', onCreatePen)
  $('#getPens').on('click', onGetPens)
  $('#public-pen-load').on('click', function () {
    $('.public-blog-content').addClass('hidden')
    $('.public-pen-content').removeClass('hidden')
  })
  $('#pen-load').on('click', function () {
    $('#all-pen-content').removeClass('hidden')
  })
  $('.pen-content').on('submit', '.update-pen', onUpdatePens)
  $('.pen-content').on('submit', '.remove-pen', onDeletePen)
}

module.exports = {
  addHandlers,
  autoGetPens
}
