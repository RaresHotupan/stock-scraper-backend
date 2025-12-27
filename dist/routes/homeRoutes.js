"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controllers/homeController");
const router = express_1.default.Router();
router.get('/', homeController_1.getHomePage);
router.get('/sp500', homeController_1.getSp500);
router.get('/sp500/stats/:symbol', homeController_1.getSp500Stats);
exports.default = router;
//# sourceMappingURL=homeRoutes.js.map