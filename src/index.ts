import fs from "fs"
import { _csvToArray, _readCsv } from "./utils"
import { _getTwitterByENS } from "./getTwitterByEns"
import { ethers } from "ethers"

type Provider = ethers.providers.JsonRpcProvider

export async function getTwitterHandles(
    provider: Provider,
    csvPath: string,
    outputPath: string,
    ensColName: string
) {
    // First fetch local csv data as an array
    const data = await _readCsv(csvPath)
    const arr = _csvToArray(data)
    const ensNames: string[] = []

    for (let i = 0; i < arr.length; i++) {
        ensNames.push(arr[i][ensColName])
    }
    console.log("successfully created ens names!")
    ensNames.map(async (name) => {
        let twitter = await _getTwitterByENS(name, provider)
        if (twitter) {
            try {
                fs.writeFileSync(
                    `${outputPath}.txt`,
                    name + "++" + twitter + "\n",
                    { flag: "a" }
                )
                console.log(twitter)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                fs.writeFileSync(`${outputPath}.txt`, "NaN" + "\n", {
                    flag: "a",
                })
            } catch (err) {
                console.log(err)
            }
        }

        console.log(`fetched ${name}`)
    })
    console.log(`Finished fetching data for ${outputPath}`)
}
