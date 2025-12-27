import axios from "axios";
import {JSDOM} from "jsdom";
import SP500 from "../models/sp500";
import moment from "moment/moment";
import sp500 from "../models/sp500";
import sp500Statistics from "../models/sp500Statistics";
import {fetchNasdaqStatistics, getSP500Symbols} from "./scrapingService";

export async function getInitialData() {
    try {
        await sp500.truncate()
        await sp500Statistics.truncate()
        await getSP500Symbols()
        const stocks = await sp500.findAll()
        for(const stock of stocks){
            const latestIntradata = await fetchNasdaqStatistics(stock.ticker)
            if(!latestIntradata)
                continue
            stock.set({
                high:latestIntradata.High,
                low:latestIntradata.Low,
                volume:latestIntradata.Volume,
                timestamp:latestIntradata.Date,
            })
            await stock.save()
        }
    } catch (error) {
        console.error("Error fetching S&P 500 data:", error);
    }
}
