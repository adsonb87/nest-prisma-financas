import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tipo } from '@prisma/client';

@Injectable()
export class TransacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoria, transacao) {
    try {
      return await this.prisma.transacao.create({
        //connect: body.tags.map((tag) => ({nome: tag.toUpperCase(),})),
        data: {
          ...transacao,
          tipoTransacao:
            transacao.tipoTransacao == 'RECEITA' ? Tipo.RECEITA : Tipo.DESPESA,
          categoria: {
            connect: {
              id: categoria.id,
              nome: categoria.nome,
            },
          },
        },
        include: {
          categoria: true,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
  async findAll() {
    try {
      return await this.prisma.transacao.findMany({
        include: { categoria: true },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.transacao.findUnique({
        where: { id },
        include: { categoria: true },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id, update) {
    try {
      return await this.prisma.transacao.update({
        where: { id },
        data: update,
        include: {
          categoria: true,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async remove(id) {
    try {
      return await this.prisma.transacao.delete({
        where: id,
        include: { categoria: true },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
