'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createPen = function (data) {
  data.user = store.user
  return $.ajax({
    url: config.apiUrl + '/pens',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getPens = function () {
  return $.ajax({
    url: config.apiUrl + '/pens',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePens = function (data, penId) {
  return $.ajax({
    url: config.apiUrl + '/pens/' + penId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePen = function (penId) {
  return $.ajax({
    url: config.apiUrl + '/pens/' + penId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPen,
  getPens,
  updatePens,
  deletePen
}
