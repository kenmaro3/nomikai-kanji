const ts_to_date = (x) => {
    const date = new Date(x)
    const return_str = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear()
    // " " + date.getHours() +
    // ":" + date.getMinutes() +
    // ":" + date.getSeconds()
    return return_str
}


export { ts_to_date }