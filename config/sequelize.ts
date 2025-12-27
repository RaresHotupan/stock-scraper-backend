import { Sequelize } from 'sequelize-typescript'; // Changed import
import { SP500Statistics } from '../models/sp500Statistics';
import SP500 from "../models/sp500"; // Import the model

const sequelize = new Sequelize('day_trading', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Disable logging SQL queries to console
  models: [SP500Statistics,SP500], // Register the model
});

export default sequelize;
