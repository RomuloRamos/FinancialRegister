import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('transactions')
class Transactions{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId:string;

    
    @Column()
    income: number;
    
    @Column()
    outflow: number;
    
    @Column()
    description:string;

    @Column()
    dateTransaction: Date;
    
}

export default Transactions;