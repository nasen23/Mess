const levelInfo = require('./levelInfo')
const global = require('../global')

const MAX_LEVEL = 1

function loadLevelData (levelNum) {
    return levelInfo.levels[levelNum]
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
