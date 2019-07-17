function levelData () {
    return {
        audio: 0,
        words: 'day',
        width: 4,
        height: 5,
        exit: cc.v2(2, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            9, 1, 0, 0,
            1, 1, 0, 0
        ],
        meSize: 2
    }
}

module.exports = {
    levelData
}
