import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sp500_statistics',
  timestamps: false, // Set to false to match the table created by Prisma
})
export class SP500Statistics extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  ticker!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  high?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  low?: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  volume?: bigint;
}

export default SP500Statistics;