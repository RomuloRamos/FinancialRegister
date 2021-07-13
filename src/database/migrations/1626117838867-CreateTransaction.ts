import {MigrationInterface,  QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransaction1626117838867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                    },
                    {
                        name: 'income',
                        type: 'float', 
                        default: 0.0, 
                        precision: 12
                    },
                    {
                        name: 'outflow',
                        type: 'float', 
                        default: 0.0, 
                        precision: 12
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'dateTransaction',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
    
                ]
            })
        );
        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedTableName: 'users',
              referencedColumnNames: ['id']
            })
          );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
        // await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
