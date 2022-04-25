"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitterHandles = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const getTwitterByEns_1 = require("./getTwitterByEns");
const ethers_1 = require("ethers");
const ethersProvider = new ethers_1.ethers.providers.JsonRpcProvider("124535"
// ie  "https://mainnet.infura.io/v3/12345"
);
function getTwitterHandles(provider, csvPath, outputPath, ensColName) {
    return __awaiter(this, void 0, void 0, function* () {
        // First fetch local csv data as an array
        const data = yield (0, utils_1._readCsv)(csvPath);
        const arr = (0, utils_1._csvToArray)(data);
        const ensNames = [];
        for (let i = 0; i < arr.length; i++) {
            ensNames.push(arr[i][ensColName]);
        }
        console.log("successfully created ens names!");
        ensNames.map((name) => __awaiter(this, void 0, void 0, function* () {
            let twitter = yield (0, getTwitterByEns_1._getTwitterByENS)(name, provider);
            if (twitter) {
                try {
                    fs_1.default.writeFileSync(`${outputPath}.txt`, name + "++" + twitter + "\n", { flag: "a" });
                    console.log(twitter);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    fs_1.default.writeFileSync(`${outputPath}.txt`, "NaN" + "\n", {
                        flag: "a",
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
            console.log(`fetched ${name}`);
        }));
        console.log(`Finished fetching data for ${outputPath}`);
    });
}
exports.getTwitterHandles = getTwitterHandles;
//# sourceMappingURL=index.js.map