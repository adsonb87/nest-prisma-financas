import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioRepository } from './repositories/usuario.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, UsuarioRepository],
  exports: [UsuarioService],
})
export class UsuarioModule {}
