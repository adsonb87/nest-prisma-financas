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
import { TransacaoService } from './transacao.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { query } from 'express';

@ApiTags('Transacao')
@Controller('/api/v1/transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  async create(@Body() createTransacaoDto) {
    try {
      const retorno = await this.transacaoService.create(createTransacaoDto);
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
      const retorno = await this.transacaoService.findAll();
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get('/usuario/:id')
  async findTransacaoUsuario(@Param('id') id: string) {
    try {
      const retorno = await this.transacaoService.findTransacaoUsuario(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  @Get('/tipo')
  async findTransacaoTipo(@Query() params) {
    try {
      const retorno = await this.transacaoService.findTransacaoTipo(params);
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
      const retorno = await this.transacaoService.findOne(+id);
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
    @Body() updateTransacaoDto: UpdateTransacaoDto,
  ) {
    try {
      const retorno = await this.transacaoService.update(
        +id,
        updateTransacaoDto,
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
      const retorno = await this.transacaoService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}
