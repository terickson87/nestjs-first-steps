import { Body, Controller, Get, Header, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { MyValidationPipe } from 'src/my-validation/my-validation.pipe';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  async create(
    @Body(new MyValidationPipe()) createCatDto: CreateCatDto,
  ) {
    this.catsService.create(createCatDto);
  }
  
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Post('createWithDto')
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createWithDto(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('createWithDto2')
  @UsePipes(new MyValidationPipe())
  async createWithDto2(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('createWithDto3')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createWithDto3(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('createWithDto4')
  @Roles(Role.Admin)
  async createWithDto4(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}
