'use strict '
const store = require('../store.js')
const penEvents = require('../pens/events.js')
const status = require('./status')

const signUpSuccess = function () {
  $('.status').text('You have successfully signed up! Please sign in!')
  status.resetClearStatus()
  $('#myModal1').modal('toggle')
  $('input[type=text]').val('')
  $('input[type=email]').val('')
  $('input[type=password]').val('')
}
const signUpFailure = function () {
  $('.authmessage1').text('Please try again!')
  status.resetClearStatus()
  $('input[type=text]').val('')
  $('input[type=email]').val('')
  $('input[type=password]').val('')
}
const signInSuccess = function (data) {
  $('.status').text('You have successfully signed in!')
  status.resetClearStatus()
  $('#myModal').modal('toggle')
  $('.sign-in').addClass('hidden')
  $('.sign-up').addClass('hidden')
  $('.show-on-sign-in').removeClass('hidden')
  $('input[type=text]').val('')
  $('input[type=email]').val('')
  $('input[type=password]').val('')
  $('.public').addClass('hidden')
  $('.status').removeClass('hidden')
  $('.private').removeClass('hidden')
  store.user = data.user
  // automatically get pens
  penEvents.autoGetPens()
}
const signInFailure = function () {
  $('.authmessage').text('Please try again!')
  status.resetClearStatus()
  $('input[type=text]').val('')
  $('input[type=email]').val('')
  $('input[type=password]').val('')
}
const changePasswordSuccess = function () {
  $('.status').text('You have successfully changed password!')
  status.resetClearStatus()
  $('#myModal2').modal('toggle')
  $('input[type=text]').val('')
  $('input[type=password]').val('')
}
const changePasswordFailure = function () {
  $('.authmessage2').text('Please try again!')
  status.resetClearStatus()
  $('input[type=text]').val('')
  $('input[type=password]').val('')
}
const signOutSuccess = function () {
  $('.status').text('You have signed out!')
  status.resetClearStatus()
  $('.sign-in').removeClass('hidden')
  $('.sign-up').removeClass('hidden')
  $('.show-on-sign-in').addClass('hidden')
  $('input[type=text]').val('')
  $('input[type=password]').val('')
  $('.content').empty()
  $('.public').removeClass('hidden')
  $('.status').removeClass('hidden')
  $('.private').addClass('hidden')
  $('.pen-content').html('')
  store.user = null
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess
}
