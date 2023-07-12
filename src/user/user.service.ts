import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./DTO/update-put-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

   async create({name,email,password,birthAt}: CreateUserDTO){
        
        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

       return await this.prisma.user.create({
            data: {
                name,
                email,
                password,
                birthAt: birthAt ? new Date(birthAt): null 
            }
        });
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(id: number){
        await this.exist(id);
        return this.prisma.user.findUnique({
            where: {
                id 
            }
        });
    }

    async update(id: number,{email,name,password,birthAt,role}: UpdatePutUserDTO){
        await this.exist(id);

        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

        return this.prisma.user.update({
            data: {email,name,password, birthAt: birthAt ? new Date(birthAt): null,role} ,
            where: {
                id
            }
        });
    }

    async updatePartial(id: number,{email,name,password,birthAt,role}: UpdatePatchUserDTO){
        await this.exist(id);

        const data: any = {};

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }

        if(email){
            data.email = email;
        }

        if(name){
            data.name = name;
        }

        if(password){
            const salt = await bcrypt.genSalt();

            data.password = await bcrypt.hash(password, salt);
        }

        if(role){
            data.role = role;
        }


        return this.prisma.user.update({
            data ,
            where: {
                id
            }
        });
    }

    async delete(id: number){
        await this.exist(id);
        return this.prisma.user.delete({
            where: {
                id 
            }
        });
    }

    async exist(id: number){
        if(!(await this.prisma.user.count({
            where: {id}
        }))){

            throw new NotFoundException(`O usuario ${id} não existe.`);
        }
    }
}