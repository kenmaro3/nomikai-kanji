const datas = [
    {
        id: "1",
        name: "crazy nomi",
        host: "kenmaro",
        passcode: "1",
        date: [1668933291929, 1668933281929],
        location: ["東京駅", "新宿駅"],
        deadline: 1668933291929,
        venue: {
            "東京駅": [
                "https://tabelog.com/tokyo/A1302/A130201/13234544/",
                "https://tabelog.com/tokyo/A1301/A130102/13234376/",
                "https://tabelog.com/tokyo/A1301/A130102/13234375/",
            ],
            "新宿駅": [
                "https://tabelog.com/tokyo/A1304/A130401/13197334/",
                "https://tabelog.com/tokyo/A1304/A130401/13046079/",
            ]
        }
    },
    {
        id: "2",
        name: "toriyaro",
        host: "takashi",
        passcode: "2",
        date: [1668933191929, 1668933281929],
        location: ["池袋駅", "新宿駅"],
        deadline: 1668933291929,
        venue: {
            "池袋駅": [
                "https://tabelog.com/tokyo/A1302/A130201/13234544/",
                "https://tabelog.com/tokyo/A1301/A130102/13234376/",
            ],
            "新宿駅": [
                "https://tabelog.com/tokyo/A1304/A130401/13197334/",
                "https://tabelog.com/tokyo/A1304/A130401/13046079/",
            ]
        }
    }
]

const votes = [
    {
        id: "1",
        voter_id: "1",
        plan_id: "1",
        location: ["東京駅", "新宿駅"],
        venue: ["url1", "url2"],
        date: [1668938218651],

    },
    {
        id: "2",
        voter_id: "2",
        plan_id: "1",
        location: ["東京駅", "新宿駅"],
        venue: ["url3", "url2"],
        date: [1668938218651],

    }
]

function generateUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

function generatePasscode() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

export { datas, votes, generateUuid, generatePasscode }
