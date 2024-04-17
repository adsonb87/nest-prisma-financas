import { Injectable } from '@nestjs/common';
import { TipoTransacao } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransacaoDto) {
    try {
      return await this.prisma.transacao.create({
        data: {
          ...createTransacaoDto,
          TipoTransacao:
            createTransacaoDto.tipo === 'RECEITA'
              ? TipoTransacao.RECEITA
              : TipoTransacao.DESPESA,
          tags: {
            //create: body.tags.map((tag) => ({nome: tag.toUpperCase(),})),
            //connect: body.tags.map((tag) => ({nome: tag.toUpperCase(),})),

            connectOrCreate: createTransacaoDto.tags.map((tag) => ({
              where: {
                nome: tag.toUpperCase(),
              },
              create: {
                nome: tag.toUpperCase(),
              },
            })),
          },
        },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
