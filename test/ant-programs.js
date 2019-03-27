module.exports =
    [
        {
            worldSize: 1000,
            program: [1, 0, 1, 1, 0, 1],
            results: [
                {
                    steps: 0,
                    expected: [0, 0, 0, 0, 0, 0]
                },
                {
                    steps: 20,
                    expected: [0, 9, 1, 3, 0, 0]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 1],
            results: [
                {
                    steps: 12540,
                    expected: [907, 1014]
                },
                {
                    steps: 12550,
                    expected: [909, 1016]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 1, 1, 0],
            results: [
                {
                    steps: 400,
                    expected: [8, 53, 2, 1]
                },
                {
                    steps: 28000,
                    expected: [232, 128, 338, 60]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 0, 0, 1, 0],
            results: [
                {
                    steps: 666,
                    expected: [23, 9, 27, 17, 13]
                },
                {
                    steps: 328983,
                    expected: [492, 53308, 937, 594, 131]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 0, 1],
            results: [
                {
                    steps: 23154,
                    expected: [601, 715, 685]
                },
                {
                    steps: 917761,
                    expected: [7798, 9880, 9489]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 0, 1, 1],
            results: [
                {
                    steps: 2312,
                    expected: [102, 93, 12, 49]
                },
                {
                    steps: 1370573,
                    expected: [8201, 8319, 25504, 7870]
                }
            ]
        },
        {
            worldSize: 1000,
            program: [0, 1, 1, 0],
            results: [
                {
                    steps: 2312,
                    expected: [37, 57, 31, 15]
                },
                {
                    steps: 20061055,
                    expected: [12782, 7842, 13130, 5387]
                }
            ]
        },
    ];
