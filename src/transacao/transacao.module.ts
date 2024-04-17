import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransacaoRepository } from './repositories/transacao.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransacaoController],
  providers: [TransacaoService, PrismaService, TransacaoRepository],
  exports: [TransacaoService],
})
export class TransacaoModule {}
