import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import bcrypt from 'bcryptjs';


@Entity('users')
class Users{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login:string;

    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    birthDate: string;
    
    @Column()
    password:string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,8);
    }
}

export default Users;