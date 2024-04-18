import { Injectable } from '@nestjs/common';
import { TipoTransacao } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransacaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(tags, transacao) {
    try {
      return await this.prisma.transacao.create({
        data: {
          ...transacao,
          tipo:
            transacao.tipo == 'RECEITA'
              ? TipoTransacao.RECEITA
              : TipoTransacao.DESPESA,
          tags: {
            //create: tags.map((t) => ({ nome: t })),
            connectOrCreate: tags.map((t) => ({
              where: { nome: t.toUpperCase() },
              create: { nome: t.toUpperCase() },
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
