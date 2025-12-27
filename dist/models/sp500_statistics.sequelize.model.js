"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class SP500Statistics extends sequelize_1.Model {
}
SP500Statistics.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ticker: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    high: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    low: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    volume: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'sp500_statistics',
    timestamps: false, // Set to false to match the table created by Prisma
});
exports.default = SP500Statistics;
//# sourceMappingURL=sp500_statistics.sequelize.model.js.map