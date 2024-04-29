import { Body, Controller, Get, Header, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }
  
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Post('createWithDto')
  async createWithDto(@Body() createCatDto: CreateCatDto) {
    return `This action creates a cat with the DRO ${createCatDto}`;
  }
}
