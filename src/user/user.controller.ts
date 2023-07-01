import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UpdatePutUserDTO } from "./DTO/update-put-user.dto";
import { UpdatePatchUserDTO } from "./DTO/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() data: CreateUserDTO){
        return await this.userService.create(data);
    }

    @Get()
    async list(){
        return await this.userService.list();
    }

    @Get(':id')
    async show(@Param('id',ParseIntPipe) id: number){
        return await this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO,@Param('id',ParseIntPipe) id: number){
        return this.userService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id',ParseIntPipe) id: number){
        return this.userService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return await this.userService.delete(id);
    }
}