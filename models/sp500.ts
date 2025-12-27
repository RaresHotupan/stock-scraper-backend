import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'sp500',
    timestamps: false,
})
export class SP500 extends Model {
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
        type: DataType.DATE,
        allowNull: false,
    })
    last_refreshed!: Date;

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

export default SP500;
