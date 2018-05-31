'use strict'

// leave status messages visible for 10 seconds
const duration = 10000

let clearStatus = setTimeout(
  function () {
    $('.status').text('')
  }, duration
)

// destroy and recreate the status hiding timeout every time a new thing happens
const resetClearStatus = function resetClearStatus () {
  clearTimeout(clearStatus)
  clearStatus = setTimeout(
    function () {
      $('.status').text('')
    }, duration
  )
}

module.exports = {
  resetClearStatus
}
