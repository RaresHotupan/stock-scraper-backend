import axios from 'axios';
import {SP500Statistics} from "../models/sp500Statistics";
import {NasdaqStats} from "../types/nasdaq-stats-types";
// @ts-ignore
import {JSDOM} from "jsdom";
import SP500 from "../models/sp500";
import moment from "moment";

export async function fetchNasdaqStatistics(symbol:string) {
    try {
        const response = await axios.get<NasdaqStats>(
            'https://charting.nasdaq.com/data/charting/historical',
            {
                params: {
                    symbol: symbol,
                    date: '1992-01-31~2046-06-01',
                    frequencyID: 2,//disabling this will fetch the daily data
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
            }
        );

        if(!response?.data?.marketData)
            return

        await SP500Statistics.bulkCreate(response.data.marketData.map((entry) => ({
            ticker: symbol,
            timestamp: new Date(entry.Date),
            high: entry.High,
            low: entry.Low,
            volume: entry.Volume,

        })))

        return response?.data?.latestIntradayData;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getSP500Symbols() {
    try {
        const { data } = await axios.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies");
        const dom = new JSDOM(data);
        const document = dom.window.document;

        const symbols:string[] = [];
        const rows = document.querySelectorAll("table.wikitable.sortable tbody tr");

        rows.forEach((row) => {
            const symbolCell = row.querySelector("td");
            if (symbolCell && symbolCell.textContent.trim().length<=3) {
                symbols.push(symbolCell.textContent.trim());
            }
        });

        await SP500.bulkCreate(symbols.map((symbol)=>({ticker:symbol,timestamp:moment(),last_refreshed:moment()})));
    } catch (error) {
        console.error("Error fetching S&P 500 data:", error);
    }
}
