const a = require('./a')
const b = require('./b')

const global = require('../global')

const MAX_LEVEL = 1

function loadLevelData (levelNum) {
    switch (levelNum) {
    case 0: return a.levelData()
    case 1: return b.levelData()
    default: break
    }
}

function nextLevel () {
    if (global.level === MAX_LEVEL) {
        return false
    }
    return true
}

module.exports = {
    loadLevelData,
    nextLevel
}
