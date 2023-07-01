import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./DTO/update-put-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

   async create({name,email,password}: CreateUserDTO){

       return await this.prisma.user.create({
            data: {
                name,
                email,
                password
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

    async update(id: number,data: UpdatePutUserDTO){
        await this.exist(id);
        return this.prisma.user.update({
            data ,
            where: {
                id
            }
        });
    }

    async updatePartial(id: number,data: UpdatePatchUserDTO){
        await this.exist(id);
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