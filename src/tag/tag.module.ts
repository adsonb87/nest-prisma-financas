import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagRepository } from './repositories/tag.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService, PrismaService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
