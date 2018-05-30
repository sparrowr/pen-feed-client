'use strict'

const store = require('../store.js')

// these constants are partly Jetpens recommendations and partly personal experience
// they're the number of days before a given ink type ought to be cleaned out of a pen
const cleanIntervals = {
  'Empty': 7,
  'Shimmer': 14,
  'Bulletproof': 21,
  'Waterproof': 28,
  'Water-Soluble': 42
}

// these are strings to add in Handlebars based on pen cleaning priority
const cleaningMessages = {
  0: 'This pen really should be cleaned!',
  1: 'This pen should be cleaned now.',
  2: 'This pen should probably be cleaned this week.',
  3: 'This pen will need cleaning eventually.',
  4: 'This pen is clean.',
  5: 'Please add more information to see cleaning guidance.'
}

// accept pen with days inked, return cleaning priority 0-3
// priority 0 needs cleaning most badly, priority 3 doesn't need cleaning yet
const addCleaningPriority = function addCleaningPriority (pen) {
  // if this has an invalid or unrecorded ink type and isn't clean, priority 5
  if (!cleanIntervals[pen.inkType]) {
    return 5
  }
  // if daysSinceUpdate > cleanInterval * 2, priority 0
  if (pen.daysSinceUpdate > cleanIntervals[pen.inkType] * 2) {
    return 0
  }
  // if daysSinceUpdate > cleanInterval, priority 1
  if (pen.daysSinceUpdate > cleanIntervals[pen.inkType]) {
    return 1
  }
  // if daysSinceUpdate > cleanInterval + 7, priority 2
  if (pen.daysSinceUpdate > cleanIntervals[pen.inkType] + 7) {
    return 2
  }
  return 3
}

// accept pen, return pen with number of days since last activity
// and, if it's not clean, how badly it needs cleaning
const addStatusInfo = function addStatusInfo (pen) {
  // JavaScript months are zero-indexed
  const dateOfChange = new Date(pen.changedYear, (pen.changedMonth - 1), pen.changedDay)
  const msSinceEpoch = Date.now()
  // 1000 ms in a second, 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day
  const msPerDay = 1000 * 60 * 60 * 24
  pen.daysSinceUpdate = Math.floor((msSinceEpoch - dateOfChange.valueOf()) / msPerDay)
  // validate data / ignore future updates
  if (!(pen.daysSinceUpdate > 0)) {
    pen.daysSinceUpdate = 0
  }
  // if it's not clean, determine how badly it needs cleaning
  if (pen.isClean) {
    pen.cleaningMessage = cleaningMessages[4]
  } else {
    pen.cleaningPriority = addCleaningPriority(pen)
    pen.cleaningMessage = cleaningMessages[pen.cleaningPriority]
  }
  return pen
}

// accept two pens, if penA should be displayed first return -1
// if penB should be displayced first return 1
// if they're an equal number of days since last change return 0
const mostRecentPen = function mostRecentPen (penA, penB) {
  if (penA.daysSinceUpdate < penB.daysSinceUpdate) {
    return -1
  } else if (penB.daysSinceUpdate > penA.daysSinceUpdate) {
    return 1
  }
  return 0
}

// accept two pens, if penA should be displayed first return -1
// if penB should be displayced first return 1
// if they're identical in priority return 0
const comparePens = function comparePens (penA, penB) {
  // if both pens are clean, return whichever was touched more recently
  if (penA.isClean === true && penB.isClean === true) {
    return mostRecentPen(penA, penB)
  }
  // if only one pen is clean, it is less urgent than pen that isn't clean
  if (penA.isClean === true && penB.isClean === false) {
    return 1
  } else if (penB.isClean === true && penA.isClean === false) {
    return -1
  }
  // if neither is clean and cleaning priorites are different
  // return higher priority pen
  if (penA.cleaningPriority < penB.cleaningPriority) {
    return -1
  } else if (penA.cleaningPriority > penB.cleaningPriority) {
    return 1
  }
  // if neither is clean and cleaning priorities are the same
  // return most recent pen
  return mostRecentPen(penA, penB)
}

// accept data formatted with web form, return data formatted for ajax
// convert isInked and isClean to Booleans
const storePen = function storePen (data) {
  data.pen.isInked = !!data.pen.isInked
  data.pen.isClean = !!data.pen.isClean
  // if a date was entered, convert that date
  // form input is a string like "2018-05-30"
  if (data.pen.changedOn) {
    data.pen.changedYear = data.pen.changedOn.slice(0, 4) * 1
    data.pen.changedMonth = data.pen.changedOn.slice(5, 7) * 1
    data.pen.changedDay = data.pen.changedOn.slice(8) * 1
  }
  return data
}

const displayPens = function displayPens (data) {
  // accept an array of pens formatted from Express
  // return array of pens formatted for handlebars
  // first drop all the pens that belong to other people
  // and apply status info to ones that belong to current user
  let myPens = []
  data.pens.forEach(function (pen) {
    if (pen.owner === store.user._id) {
      myPens.push(addStatusInfo(pen))
    }
  })
  // next, sort pens by priority
  myPens = myPens.sort(comparePens)
  store.pens = myPens
  console.log(store.pens)
  return store.pens
}

module.exports = {
  storePen,
  displayPens
}
