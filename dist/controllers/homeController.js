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
exports.createStatEntry = exports.getSp500Stats = exports.getSp500 = exports.getHomePage = void 0;
const dataModel_1 = require("../models/dataModel"); // Add createStat
const homeView_1 = require("../views/homeView");
const sp500_1 = __importDefault(require("../models/sp500"));
const sp500Statistics_1 = __importDefault(require("../models/sp500Statistics"));
const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield (0, dataModel_1.getAllStats)();
    const dataForView = `<h1>Stats:</h1><pre>${JSON.stringify(stats, null, 2)}</pre>`;
    const html = (0, homeView_1.render)(dataForView);
    res.send(html);
});
exports.getHomePage = getHomePage;
const getSp500 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stocks = yield sp500_1.default.findAll();
    res.status(200).json(stocks);
});
exports.getSp500 = getSp500;
const getSp500Stats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const symbol = req.params.symbol;
    try {
        const stockStats = yield sp500Statistics_1.default.findAll({ where: { ticker: symbol } });
        res.status(200).json(stockStats);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getSp500Stats = getSp500Stats;
const createStatEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // The input data from the request body should match the Prisma.sp500_statisticsCreateInput type
        const newStatData = req.body;
        // Basic validation
        if (!newStatData.ticker || !newStatData.timestamp) {
            return res.status(400).send('Ticker and timestamp are required');
        }
        const newStat = yield (0, dataModel_1.createStat)(newStatData);
        res.status(201).json(newStat);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error creating stat entry');
    }
});
exports.createStatEntry = createStatEntry;
//# sourceMappingURL=homeController.js.map