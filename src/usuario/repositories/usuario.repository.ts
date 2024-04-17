import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { NotFoundError } from 'rxjs';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuarioDto: CreateUsuarioDto) {
    try {
      const usuarioCriado = await this.prisma.usuario.create({
        data: usuarioDto,
      });
      return usuarioCriado;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findUnique(email: string) {
    try {
      const usuarioLocalizado = await this.prisma.usuario.findUnique({
        where: { email },
      });
      return usuarioLocalizado;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findAll() {
    try {
      const usuariosLocalizados = await this.prisma.usuario.findMany();
      return usuariosLocalizados;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findId(id: number) {
    try {
      const usuarioLocalizado = await this.prisma.usuario.findUnique({
        where: { id },
      });
      return usuarioLocalizado;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id: number, usuarioDto: UpdateUsuarioDto) {
    try {
      const usuarioAtualizado = await this.prisma.usuario.update({
        where: { id },
        data: usuarioDto,
      });
      return usuarioAtualizado;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async delete(id: number) {
    try {
      const usuarioDeletado = await this.prisma.usuario.delete({
        where: { id },
      });
      return usuarioDeletado;
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
