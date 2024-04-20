import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tipo } from '@prisma/client';

@Injectable()
export class CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: {
          ...createCategoriaDto,
          tipoCategoria:
            createCategoriaDto.tipoCategoria == 'RECEITA'
              ? Tipo.RECEITA
              : Tipo.DESPESA,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.categoria.findMany();
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findCategoriaTipo(id, params) {
    try {
      return await this.prisma.categoria.findMany({
        where: {
          AND: [
            {
              id: id,
              tipoCategoria: {
                equals: params,
              },
            },
          ],
        },
        include: { transacoes: true },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findTipoCategoria(params) {
    try {
      return await this.prisma.categoria.findMany({
        where: {
          tipoCategoria: {
            equals: params,
          },
        },
        include: { transacoes: true },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.categoria.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id: number, updateCategoriaDto) {
    try {
      return await this.prisma.categoria.update({
        where: { id },
        data: {
          ...updateCategoriaDto,
          tipoCategoria:
            updateCategoriaDto.tipoCategoria == 'RECEITA'
              ? Tipo.RECEITA
              : Tipo.DESPESA,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
  async remove(id: number) {
    try {
      return await this.prisma.categoria.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
