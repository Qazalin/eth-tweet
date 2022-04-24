import fs from "fs"

/** Returns an array of theire csv data
 * @param csv_path the path to csv
 * @async
 */
export async function _readCsv(csv_path: string) {
    try {
        const data = fs.readFileSync(csv_path, "utf8")
        return data
    } catch (err) {
        console.error(err)
    }
}
