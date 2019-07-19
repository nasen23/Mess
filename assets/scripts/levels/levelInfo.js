const levels = {
    1: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 4,
        exit: cc.v2(2, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            9, 1, 4, 0,
            1, 1, 1, 0
        ],
        meSize: 2
    },
    2: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 5,
        exit: cc.v2(2, 3),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            9, 1, 4, 0,
            1, 1, 1, 2
        ],
        meSize: 2
    },
    3: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 5,
        exit: cc.v2(2, 3),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 2, 0, 0,
            0, 2, 0, 0,
            9, 1, 3, 1,
            1, 1, 3, 1
        ],
        meSize: 2
    },
    4: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 5,
        exit: cc.v2(2, 0),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 0, 2, 2,
            0, 0, 3, 1,
            9, 1, 5, 1,
            1, 1, 1, 1
        ],
        meSize: 2
    },
    5: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 5,
        exit: cc.v2(2, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 2,
            9, 1, 3, 1,
            1, 1, 0, 2,
            4, 0, 2, 2,
            1, 2, 2, 2
        ],
        meSize: 2
    },
    6: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 5,
        exit: cc.v2(3, 0),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            0, 0, 5, 1, 0,
            3, 1, 1, 1, 0,
            9, 1, 4, 0, 0,
            1, 1, 1, 3, 1
        ],
        meSize: 2
    },
    7: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 5,
        exit: cc.v2(3, 0),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            0, 0, 5, 1, 0,
            3, 1, 1, 1, 0,
            9, 1, 4, 2, 2,
            1, 1, 1, 3, 1
        ],
        meSize: 2
    },
    8: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 5,
        exit: cc.v2(3, 0),
        exitDirection: 'right',
        map: [
            0, 0, 0, 4, 0,
            0, 0, 0, 1, 0,
            2, 2, 5, 1, 4,
            9, 1, 1, 1, 1,
            1, 1, 6, 1, 1
        ],
        meSize: 2
    },
    9: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            6, 1, 1, 0, 0, 0,
            7, 7, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0,
            1, 1, 2, 2, 2, 0,
            9, 1, 6, 1, 1, 0,
            1, 1, 6, 1, 1, 0
        ],
        meSize: 2
    },
    10: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            2, 0, 0, 6, 1, 1,
            7, 0, 0, 0, 0, 7,
            1, 0, 0, 0, 2, 1,
            1, 0, 4, 4, 2, 1,
            9, 1, 1, 1, 5, 1,
            1, 1, 3, 1, 1, 1
        ],
        meSize: 2
    },
    11: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 4,
        exit: cc.v2(4, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            9, 1, 8, 1, 0, 0,
            1, 1, 1, 1, 0, 0
        ],
        meSize: 2
    },
    12: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 2, 0, 0, 0, 0,
            0, 2, 0, 0, 0, 0,
            9, 1, 8, 1, 4, 4,
            1, 1, 1, 1, 1, 1
        ],
        meSize: 2
    },
    13: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 4, 0, 0,
            3, 1, 4, 1, 0, 0,
            3, 1, 1, 2, 0, 0,
            9, 1, 8, 1, 0, 0,
            1, 1, 1, 1, 2, 0
        ],
        meSize: 2
    },
    14: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 5, 1,
            0, 0, 4, 0, 1, 1,
            0, 0, 1, 3, 1, 0,
            9, 1, 8, 1, 0, 0,
            1, 1, 1, 1, 2, 2
        ],
        meSize: 2
    },
    15: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 2, 0, 0, 0, 0,
            0, 5, 1, 0, 0, 0,
            2, 1, 1, 0, 0, 0,
            2, 0, 3, 1, 0, 4,
            9, 1, 8, 1, 0, 1,
            1, 1, 1, 1, 3, 1
        ],
        meSize: 2
    },
    16: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 3, 1, 0, 0,
            0, 2, 0, 4, 3, 1,
            4, 4, 0, 1, 2, 0,
            1, 1, 2, 3, 1, 0,
            9, 1, 8, 1, 2, 0,
            1, 1, 1, 1, 2, 2
        ],
        meSize: 2
    },
    17: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 2, 0, 0, 0,
            0, 4, 4, 5, 1, 0,
            0, 1, 1, 1, 1, 4,
            3, 1, 2, 3, 1, 1,
            9, 1, 8, 1, 0, 4,
            1, 1, 1, 1, 0, 1
        ],
        meSize: 2
    },
    18: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(4, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 5, 1, 0,
            0, 0, 0, 1, 1, 0,
            0, 0, 0, 5, 1, 0,
            6, 1, 1, 1, 1, 2,
            9, 1, 8, 1, 5, 1,
            1, 1, 8, 1, 1, 1
        ],
        meSize: 2
    },
    19: {
        audio: 0,
        words: 'day',
        width: 7,
        height: 7,
        exit: cc.v2(5, 5),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 5, 1, 7, 0,
            0, 0, 0, 1, 1, 1, 0,
            6, 1, 1, 5, 1, 1, 0,
            6, 1, 1, 1, 1, 2, 0,
            9, 1, 8, 1, 5, 1, 0,
            1, 1, 1, 1, 1, 1, 0
        ],
        meSize: 2
    },
    20: {
        audio: 0,
        words: 'day',
        width: 7,
        height: 7,
        exit: cc.v2(5, 5),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 6, 1, 1,
            0, 6, 1, 1, 2, 0, 0,
            0, 0, 6, 1, 1, 5, 1,
            0, 5, 1, 0, 0, 1, 1,
            0, 1, 1, 0, 0, 0, 7,
            9, 1, 8, 1, 5, 1, 1,
            1, 1, 1, 1, 1, 1, 1
        ],
        meSize: 2
    },
    21: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 3,
        exit: cc.v2(3, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 5, 1, 0,
            10, 1, 1, 0
        ],
        meSize: 1
    },
    22: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 3,
        exit: cc.v2(3, 2),
        exitDirection: 'right',
        map: [
            0, 2, 2, 0,
            0, 2, 2, 2,
            10, 2, 2, 2
        ],
        meSize: 1
    },
    23: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 3,
        exit: cc.v2(4, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            0, 8, 1, 4, 0,
            10, 1, 1, 1, 0
        ],
        meSize: 1
    },
    24: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 4,
        exit: cc.v2(5, 3),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 4, 0, 0,
            0, 8, 1, 1, 5, 1,
            10, 1, 1, 2, 1, 1
        ],
        meSize: 1
    },
    25: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 5,
        exit: cc.v2(5, 0),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 3, 1,
            0, 0, 0, 2, 2, 7,
            0, 0, 4, 5, 1, 1,
            10, 2, 1, 1, 1, 1
        ],
        meSize: 1
    },
    26: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 5,
        exit: cc.v2(5, 4),
        exitDirection: 'right',
        map: [
            10, 0, 0, 0, 0, 0,
            3, 1, 0, 0, 0, 0,
            6, 1, 1, 0, 0, 0,
            5, 1, 5, 1, 0, 0,
            1, 1, 1, 1, 2, 0
        ],
        meSize: 1
    },
    27: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 5,
        exit: cc.v2(5, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 2, 0, 7,
            0, 0, 5, 1, 0, 1,
            0, 0, 1, 1, 0, 1,
            6, 1, 1, 4, 5, 1,
            10, 0, 0, 1, 1, 1
        ],
        meSize: 1
    },
    28: {
        audio: 0,
        words: 'day',
        width: 7,
        height: 6,
        exit: cc.v2(6, 5),
        exitDirection: 'right',
        map: [
            0, 0, 0, 6, 1, 1, 0,
            0, 0, 4, 2, 0, 0, 0,
            0, 0, 1, 5, 1, 0, 7,
            0, 3, 1, 1, 1, 0, 1,
            6, 1, 1, 5, 1, 4, 1,
            10, 0, 0, 1, 1, 1, 2
        ],
        meSize: 1
    },
    29: {
        audio: 0,
        words: 'day',
        width: 7,
        height: 7,
        exit: cc.v2(6, 6),
        exitDirection: 'right',
        map: [
            0, 0, 0, 4, 0, 0, 0,
            0, 0, 0, 1, 0, 2, 0,
            5, 1, 7, 6, 1, 1, 0,
            1, 1, 1, 2, 5, 1, 0,
            3, 1, 1, 7, 1, 1, 0,
            6, 1, 1, 1, 0, 4, 0,
            10, 0, 0, 1, 0, 1, 2
        ],
        meSize: 1
    },
    30: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exit: cc.v2(5, 5),
        exitDirection: 'right',
        map: [
            0, 4, 2, 0, 0, 0,
            0, 1, 7, 6, 1, 1,
            5, 1, 1, 3, 1, 2,
            1, 1, 1, 2, 5, 1,
            10, 6, 1, 1, 1, 1
        ],
        meSize: 1
    },
    31: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 3,
        exut: cc.v2(3, 1),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            11, 1, 0, 0, 0,
            1, 1, 0, 0, 0
        ],
        meSize: 2
    },
    32: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 3,
        exut: cc.v2(3, 1),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            11, 1, 0, 0, 0,
            1, 1, 2, 0, 0
        ],
        meSize: 2
    },
    33: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 4,
        exut: cc.v2(3, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            11, 1, 5, 1, 4,
            1, 1, 1, 1, 1
        ],
        meSize: 2
    },
    34: {
        audio: 0,
        words: 'day',
        width: 5,
        height: 5,
        exut: cc.v2(3, 3),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0,
            5, 1, 0, 2, 0,
            1, 1, 3, 1, 0,
            11, 1, 4, 5, 1,
            1, 1, 1, 1, 1
        ],
        meSize: 2
    },
    35: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exut: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 3, 1, 4, 0, 0,
            3, 1, 0, 1, 2, 0,
            0, 2, 0, 3, 1, 0,
            11, 1, 5, 1, 0, 0,
            1, 1, 1, 1, 10, 2
        ],
        meSize: 2
    },
    36: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exut: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            5, 1, 0, 0, 0, 0,
            1, 1, 0, 0, 0, 0,
            5, 1, 5, 1, 4, 0,
            1, 1, 1, 1, 1, 0,
            11, 1, 5, 1, 5, 1,
            1, 1, 1, 1, 1, 1
        ],
        meSize: 2
    },
    37: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exut: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 3, 1, 0, 0,
            0, 2, 0, 4, 3, 1,
            4, 4, 0, 1, 2, 0,
            1, 1, 0, 3, 1, 0,
            11, 1, 0, 0, 2, 0,
            1, 1, 2, 0, 2, 2
        ],
        meSize: 2
    },
    38: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 6,
        exut: cc.v2(4, 4),
        exitDirection: 'right',
        map: [
            0, 0, 0, 3, 1, 0,
            0, 5, 1, 0, 3, 1,
            5, 1, 1, 5, 1, 0,
            6, 1, 1, 1, 1, 0,
            11, 1, 4, 4, 0, 0,
            1, 1, 1, 1, 2, 2
        ],
        meSize: 2
    },
    39: {
        audio: 0,
        words: 'day',
        width: 6,
        height: 4,
        exut: cc.v2(4, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            11, 1, 5, 1, 0, 0,
            1, 1, 1, 1, 0, 0
        ],
        meSize: 2
    },
    40: {
        audio: 0,
        words: 'day',
        width: 4,
        height: 4,
        exut: cc.v2(2, 2),
        exitDirection: 'right',
        map: [
            0, 0, 0, 0,
            0, 0, 0, 0,
            11, 1, 0, 0,
            1, 1, 0, 0,
        ],
        meSize: 2
    }
}

module.exports = {
    levels: levels
}
