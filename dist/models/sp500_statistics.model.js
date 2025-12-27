"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SP500Statistics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SP500Statistics {
    constructor(data) {
        this.id = data.id;
        this.ticker = data.ticker;
        this.timestamp = data.timestamp;
        // Convert Prisma's Decimal object to a number for easier use in the app
        this.high = data.high ? data.high.toNumber() : null;
        this.low = data.low ? data.low.toNumber() : null;
        this.volume = data.volume;
    }
    // Example method
    getTickerAndDate() {
        return `${this.ticker} - ${this.timestamp.toDateString()}`;
    }
    static bulkCreate(data) {
        4;
        try {
            prisma.sp500_statistics.createMany({ data });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.SP500Statistics = SP500Statistics;
//# sourceMappingURL=sp500_statistics.model.js.map