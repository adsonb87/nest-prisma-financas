import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepository } from './repositories/usuario.repository';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from './entities/usuario.entity';
import { send } from 'process';

@Injectable()
export class UsuarioService {
  constructor(private readonly repository: UsuarioRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const saltRounds = 10;

    try {
      const retornoEmail = await this.repository.findUnique(
        createUsuarioDto.email,
      );
      if (retornoEmail) {
        throw new NotFoundError('E-mail já cadastrado.');
      } else {
        const passwordHashed = await bcrypt.hash(
          createUsuarioDto.senha,
          saltRounds,
        );

        const usuarioCriado = await this.repository.create({
          ...createUsuarioDto,
          senha: passwordHashed,
        });

        return {
          ...usuarioCriado,
          senha: undefined,
        };
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findAll() {
    try {
      const usuarioLocalizados = await this.repository.findAll();

      if (!usuarioLocalizados) {
        throw new NotFoundError('Usuários não localizados.');
      }

      return usuarioLocalizados;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findOne(id: number) {
    try {
      const usuarioLocalizado = await this.repository.findId(id);

      if (!usuarioLocalizado) {
        throw new NotFoundError('Usuário não localizado.');
      }

      return {
        ...usuarioLocalizado,
        senha: undefined,
      };
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const saltRounds = 10;

    try {
      const usuarioLocalizado = await this.repository.findId(id);

      if (!usuarioLocalizado) {
        throw new NotFoundError('Usuário não localizado.');
      } else {
        const passwordHashed = await bcrypt.hash(
          updateUsuarioDto.senha,
          saltRounds,
        );
        const usuarioAtualizado = await this.repository.update(id, {
          ...updateUsuarioDto,
          senha: passwordHashed,
        });

        return {
          ...usuarioAtualizado,
          senha: undefined,
        };
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async remove(id: number) {
    try {
      const usuarioLocalizado = await this.repository.findId(id);
      if (!usuarioLocalizado) {
        throw new NotFoundError('Usuário não localizado.');
      } else {
        const usuarioDeletado = await this.repository.delete(id);
        return usuarioDeletado;
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
