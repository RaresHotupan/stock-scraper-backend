import express from 'express';
import homeRoutes from './routes/homeRoutes';
import sequelize from './config/sequelize'; // Import sequelize instance
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON bodies
app.use('/', homeRoutes);

// Test database connection and sync models
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync(); // Sync models with the database (creates tables if they don't exist)
    console.log('All models were synchronized successfully.');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer(); // Call the async function to start the server