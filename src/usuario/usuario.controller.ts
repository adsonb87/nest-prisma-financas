import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('/api/v1/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const retorno = await this.usuarioService.create(createUsuarioDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro no cadastro do usuário.',
        error: error.message,
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      const retorno = await this.usuarioService.findAll();
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro ao localizar usuários.',
        error: error.message,
      });
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      const retorno = await this.usuarioService.findOne(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro ao localizar usuário.',
        error: error.message,
      });
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    try {
      const retorno = await this.usuarioService.update(+id, updateUsuarioDto);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro ao atualizar usuário.',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      const retorno = await this.usuarioService.remove(+id);
      return {
        message: 'sucesso',
        result: retorno,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro ao deletar usuário.',
        error: error.message,
      });
    }
  }
}
