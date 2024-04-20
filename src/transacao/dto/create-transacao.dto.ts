import { $Enums } from '@prisma/client';
import { TransacaoEntity } from '../entities/transacao.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransacaoDto extends TransacaoEntity {
  @ApiProperty({
    example: 'Titulo',
    description: 'Título da transação',
  })
  @IsNotEmpty({ message: 'É obrigatório o preenchimento do título do usuário' })
  @IsString()
  titulo: string;

  @ApiProperty({
    example: 'Descrição',
    description: 'Descrição da transação',
  })
  @IsString()
  descricao: string;

  @ApiProperty({
    example: 0.0,
    description: 'Valor da transação',
  })
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @ApiProperty({
    example: 0,
    description: 'Id. do usuário',
  })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({
    example: 'Tipo da transação',
    description: 'Tipo da transação',
  })
  @IsString()
  @IsNotEmpty()
  tipoTransacao: $Enums.Tipo;

  @ApiProperty({
    example: 0,
    description: 'Códgo da categoria',
  })
  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @ApiProperty({
    example: '00/00/0000',
    description: 'Data de criação',
  })
  criadoEm: Date;

  @ApiProperty({
    example: '00/00/0000',
    description: 'Data de atualização',
  })
  atualizadoEm: Date;
}
