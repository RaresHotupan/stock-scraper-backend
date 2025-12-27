import sequelize from './config/sequelize';
import {fetchNasdaqStatistics, getSP500Symbols} from "./services/scrapingService";
import {getInitialData} from "./services/processingService";

async function runTests() {
    // Initialize models for testing
    await sequelize.authenticate();
    console.log('Test database connection has been established successfully.');
    // Use { force: true } for a clean slate in tests, or { alter: true } for incremental changes
    // For now, let's just sync without force to avoid dropping data if not intended.
    await sequelize.sync();
    console.log('Test models were synchronized successfully.');
    await getInitialData()
    //await fetchNasdaqStatistics('AAPL')
}

runTests().then(()=>{
    console.log('complete')});
