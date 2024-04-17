import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from '../entities/tag.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto extends TagEntity {
  @ApiProperty({
    example: 'Descrição da TAG',
    description: 'Descrição utilizada pela TAG',
  })
  @IsNotEmpty({
    message: 'É necessário realizar o preenchimento do nome da descrição',
  })
  @IsString()
  nome: string;
}
