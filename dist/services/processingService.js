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
exports.getInitialData = getInitialData;
const sp500_1 = __importDefault(require("../models/sp500"));
const sp500Statistics_1 = __importDefault(require("../models/sp500Statistics"));
const scrapingService_1 = require("./scrapingService");
function getInitialData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sp500_1.default.truncate();
            yield sp500Statistics_1.default.truncate();
            yield (0, scrapingService_1.getSP500Symbols)();
            const stocks = yield sp500_1.default.findAll();
            for (const stock of stocks) {
                const latestIntradata = yield (0, scrapingService_1.fetchNasdaqStatistics)(stock.ticker);
                if (!latestIntradata)
                    continue;
                stock.set({
                    high: latestIntradata.High,
                    low: latestIntradata.Low,
                    volume: latestIntradata.Volume,
                    timestamp: latestIntradata.Date,
                });
                yield stock.save();
            }
        }
        catch (error) {
            console.error("Error fetching S&P 500 data:", error);
        }
    });
}
//# sourceMappingURL=processingService.js.map