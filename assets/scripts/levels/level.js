const a = require('./a')
const b = require('./b')

function loadLevelData (levelNum) {
    switch (levelNum) {
    case 0: return a.levelData()
    case 1: return b.levelData()
    default: break
    }
}

module.exports = {
    loadLevelData
}
