import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('/api/v1/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const retorno = await this.tagService.create(createTagDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      const retorno = await this.tagService.findAll();
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const retorno = await this.tagService.findOne(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    try {
      const retorno = await this.tagService.update(+id, updateTagDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.tagService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
