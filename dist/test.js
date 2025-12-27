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
const sequelize_1 = __importDefault(require("./config/sequelize"));
const processingService_1 = require("./services/processingService");
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize models for testing
        yield sequelize_1.default.authenticate();
        console.log('Test database connection has been established successfully.');
        // Use { force: true } for a clean slate in tests, or { alter: true } for incremental changes
        // For now, let's just sync without force to avoid dropping data if not intended.
        yield sequelize_1.default.sync();
        console.log('Test models were synchronized successfully.');
        yield (0, processingService_1.getInitialData)();
        //await fetchNasdaqStatistics('AAPL')
    });
}
runTests().then(() => {
    console.log('complete');
});
//# sourceMappingURL=test.js.map