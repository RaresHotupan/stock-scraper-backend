"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript"); // Changed import
const sp500Statistics_1 = require("../models/sp500Statistics");
const sp500_1 = __importDefault(require("../models/sp500")); // Import the model
const sequelize = new sequelize_typescript_1.Sequelize('day_trading', 'postgres', 'root', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false, // Disable logging SQL queries to console
    models: [sp500Statistics_1.SP500Statistics, sp500_1.default], // Register the model
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map