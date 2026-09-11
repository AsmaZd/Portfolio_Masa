import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserModule } from "./users.module";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ){}

    async findAll(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null>{
        const user = this.userModel.findById(id).exec();
        if(!user){
            throw new NotFoundException('User with the "${id}" ID, not found');
        }
        return user;
    }

    async findOneByEmail(userEmail: string): Promise<User | undefined>{
        const user = await this.userModel.findOne({email: userEmail}).exec();
        if(!user){
            throw new NotFoundException('User with the "${userEmail}" email, not found');
        }
        return user;
    }

    async create(user: CreateUserDto): Promise<User>{
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const createdUser = new this.userModel({
            ...user,
            password: hashedPassword 
        });

        return createdUser.save();
    }
}