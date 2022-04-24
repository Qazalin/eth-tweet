/** Turns the csv-like string into an array
 * @param str the csv-like string
 * @param delimiter the sepertator of the csv values, default is ","
 */
export function csvToArray(str: string, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    // the headers in the csv file
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter)

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n")

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter)
        const el: Record<string, string> = headers.reduce(function (
            object: Record<string, string>,
            header,
            index
        ) {
            object[header] = values[index]
            return object
        },
        {})
        return el
    })

    // return the array
    return arr
}
