import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categoria')
@Controller('/api/v1/categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    try {
      const retorno = await this.categoriaService.create(createCategoriaDto);
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
      const retorno = await this.categoriaService.findAll();
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get(':id/tipo')
  async findCategoriaTipo(@Query() params, @Param('id') id: string) {
    try {
      const retorno = await this.categoriaService.findCategoriaTipo(
        +id,
        params,
      );
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get('/tipo')
  async findTipoCategoria(@Query() params) {
    try {
      const retorno = await this.categoriaService.findTipoCategoria(params);
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
      const retorno = await this.categoriaService.findOne(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    try {
      const retorno = await this.categoriaService.update(
        +id,
        updateCategoriaDto,
      );
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
      const retorno = await this.categoriaService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
