import { Request, Response } from 'express';
import { getAllStats, createStat } from '../models/dataModel'; // Add createStat
import { render } from '../views/homeView';
import sp500 from "../models/sp500";
import sp500Statistics from "../models/sp500Statistics";

export const getHomePage = async (req: Request, res: Response) => {
  const stats = await getAllStats();

  const dataForView = `<h1>Stats:</h1><pre>${JSON.stringify(stats, null, 2)}</pre>`;
  const html = render(dataForView);
  res.send(html);
};

export const getSp500 = async (req: Request, res: Response) => {
  const stocks = await sp500.findAll();

  res.status(200).json(stocks)
};

export const getSp500Stats = async (req: Request, res: Response) => {
  const symbol = req.params.symbol;
  try {
    const stockStats = await sp500Statistics.findAll({where: {ticker:symbol}});

    res.status(200).json(stockStats)
  }
  catch(err) {
    res.status(500).json(err);
  }
};

export const createStatEntry = async (req: Request, res: Response) => {
  try {
    // The input data from the request body should match the Prisma.sp500_statisticsCreateInput type
    const newStatData = req.body;

    // Basic validation
    if (!newStatData.ticker || !newStatData.timestamp) {
      return res.status(400).send('Ticker and timestamp are required');
    }

    const newStat = await createStat(newStatData);
    res.status(201).json(newStat);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating stat entry');
  }
};
