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
            0, 0, 5, 1,
            9, 1, 1, 1,
            1, 1, 2, 2
        ],
        meSize: 2
    }
}

module.exports = {
    levelData
}
