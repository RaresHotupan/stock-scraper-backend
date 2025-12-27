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
exports.fetchNasdaqStatistics = fetchNasdaqStatistics;
exports.getSP500Symbols = getSP500Symbols;
const axios_1 = __importDefault(require("axios"));
const sp500Statistics_1 = require("../models/sp500Statistics");
// @ts-ignore
const jsdom_1 = require("jsdom");
const sp500_1 = __importDefault(require("../models/sp500"));
const moment_1 = __importDefault(require("moment"));
function fetchNasdaqStatistics(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield axios_1.default.get('https://charting.nasdaq.com/data/charting/historical', {
                params: {
                    symbol: symbol,
                    date: '1992-01-31~2046-06-01',
                    frequencyID: 2, //disabling this will fetch the daily data
                    includeLatestIntradayData: 1,
                },
                headers: {
                    accept: '*/*',
                    'accept-language': 'en-US,en;q=0.9',
                    'cache-control': 'no-cache',
                    pragma: 'no-cache',
                    referer: 'https://charting.nasdaq.com/dynamic/chart.html',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
                },
            });
            if (!((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.marketData))
                return;
            yield sp500Statistics_1.SP500Statistics.bulkCreate(response.data.marketData.map((entry) => ({
                ticker: symbol,
                timestamp: new Date(entry.Date),
                high: entry.High,
                low: entry.Low,
                volume: entry.Volume,
            })));
            return (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.latestIntradayData;
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
function getSP500Symbols() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies");
            const dom = new jsdom_1.JSDOM(data);
            const document = dom.window.document;
            const symbols = [];
            const rows = document.querySelectorAll("table.wikitable.sortable tbody tr");
            rows.forEach((row) => {
                const symbolCell = row.querySelector("td");
                if (symbolCell && symbolCell.textContent.trim().length <= 3) {
                    symbols.push(symbolCell.textContent.trim());
                }
            });
            yield sp500_1.default.bulkCreate(symbols.map((symbol) => ({ ticker: symbol, timestamp: (0, moment_1.default)(), last_refreshed: (0, moment_1.default)() })));
        }
        catch (error) {
            console.error("Error fetching S&P 500 data:", error);
        }
    });
}
//# sourceMappingURL=scrapingService.js.map