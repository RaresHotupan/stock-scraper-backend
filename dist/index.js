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
const express_1 = __importDefault(require("express"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const sequelize_1 = __importDefault(require("./config/sequelize")); // Import sequelize instance
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Add this middleware to parse JSON bodies
app.use('/', homeRoutes_1.default);
// Test database connection and sync models
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.default.authenticate();
            console.log('Database connection has been established successfully.');
            yield sequelize_1.default.sync(); // Sync models with the database (creates tables if they don't exist)
            console.log('All models were synchronized successfully.');
            app.listen(port, () => {
                console.log(`Server listening at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
startServer(); // Call the async function to start the server
//# sourceMappingURL=index.js.map