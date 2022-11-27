const day_to_youbi = x => {
    const table = {
        0: "日",
        1: "月",
        2: "火",
        3: "水",
        4: "木",
        5: "金",
        6: "土",
    }
    return table[x]
}
const ts_to_date = (x) => {
    const date = new Date(x)
    //const return_str = date.getDate() +
    //    "/" + (date.getMonth() + 1) +
    //    "/" + date.getFullYear()

    const return_str = `${date.getFullYear()}年 ${date.getMonth()}月 ${date.getDate()}日 (${day_to_youbi(date.getDay())})`


    // " " + date.getHours() +
    // ":" + date.getMinutes() +
    // ":" + date.getSeconds()
    return return_str
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}

const venueArrayToObj = (venue, location) => {
    if (location.length == 0) return

    let obj = {}
    for (let i = 0; i < location.length; i++) {
        obj[location[i]] = arrayToObj(venue[i])
    }
    return obj
}

const arrayToObj = (arr) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[i] = arr[i];
    }
    return obj;
}

const extract_http_url = x => {
    const tmp1 = x.split(" ")
    for (let i = 0; i < tmp1.length; i++) {
        const start = tmp1[i].startsWith("http")
        if (start) {
            return tmp1[i]
        }
    }
    return x
}


export { ts_to_date, distinct, arrayToObj, venueArrayToObj, extract_http_url }