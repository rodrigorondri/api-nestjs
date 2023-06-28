import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UpdatePutUserDTO } from "./DTO/update-put-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() nome,email,password: CreateUserDTO){
        return {nome,email,password};
    }

    @Get()
    async list(){
        return {users: []};
    }

    @Get(':id')
    async show(@Param('id',ParseIntPipe) id: number){
        return {user: {},id};
    }

    @Put(':id')
    async update(@Body() nome,email,password: UpdatePutUserDTO,@Param('id',ParseIntPipe) id: number){
        return {
            methd: 'put',
            nome,email,password,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDTO, @Param('id',ParseIntPipe) id: number){
        return {
            methd: 'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){

        return {
            id
        }
    }
}