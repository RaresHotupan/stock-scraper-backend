import SP500Statistics from './sp500Statistics';
import { CreationAttributes } from 'sequelize'; // For create input type

export const getAllStats = async (): Promise<SP500Statistics[]> => {
  return SP500Statistics.findAll();
};

export const createStat = async (data: CreationAttributes<SP500Statistics>): Promise<SP500Statistics> => {
  return SP500Statistics.create(data);
};
