import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import e from 'express';


@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(catDto: CreateCatDto) {
    const cat: Cat = {
      id: this.cats.length,
      ...catDto
    }
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat: Cat) => cat.id === id);
    if (cat != undefined) {
      return cat;
    } else {
      throw new NotFoundException(`Cat with id #${id} was not found.`)
    }
  }
}