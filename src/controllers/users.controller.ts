import { Controller, Param, Body, Get, Post, Put, Delete, Patch, Ctx } from 'routing-controllers';
import { Service } from 'typedi';
import { DeepPartial } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { CTX } from '../interfaces';
import { UsersService } from '../services';

@Controller('/users')
@Service()
export class UsersController {
    constructor(private readonly usersService: UsersService){
        console.log(usersService);
    }
    @Get()
    getAll(@Ctx() ctx: CTX) {
        // ctx.db.getRepository(UsersEntity)
        return this.usersService.getData()
    }

    @Get('/:id')
    getOne(@Param('id') id: number){
        return this.usersService.getById(id)
    }

    @Post()
    post(@Body() user: DeepPartial<UsersEntity>) {
        // user.salt = ''
        return this.usersService.create(user)
    }

    @Patch('/:id')
    Patch(@Param('id') id: number, @Body() user: DeepPartial<UsersEntity>) {
        return this.usersService.update(id, user)
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        return this.usersService.del(id)
    }
}