import { ApiProperty } from '@nestjs/swagger';
import { CategoriaEntity } from '../entities/categoria.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';

export class CreateCategoriaDto extends CategoriaEntity {
  @ApiProperty({
    example: 'Descrição da TAG',
    description: 'Descrição utilizada pela TAG',
  })
  @IsNotEmpty({
    message: 'É necessário realizar o preenchimento do nome da descrição',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipoCategoria: $Enums.Tipo;
}
