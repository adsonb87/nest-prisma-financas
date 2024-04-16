import { ApiProperty } from '@nestjs/swagger';
import { UsuarioEntity } from '../entities/usuario.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto extends UsuarioEntity {
  @ApiProperty({
    example: 'Nome',
    description: 'Nome do usuário',
  })
  @IsNotEmpty({
    message: 'É obrigatório o preenchimento do nome do usuário',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'E-mail',
    description: 'E-mail do usuário, o valor do e-mail é único',
  })
  @IsNotEmpty({
    message: 'É obrigatório o preenchimento do e-mail do usuário',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Senha',
    description: 'Senha do usuário',
  })
  @IsNotEmpty({
    message: 'É obrigatório o preenchimento da senha do usuário',
  })
  @IsString()
  senha: string;

  @ApiProperty({
    example: 'dd/mm/yyyy',
    description: 'Data de criação do usuário preenchida automaticamente',
  })
  @IsNotEmpty({
    message: 'Data de criação do usuário preenchida automaticamente',
  })
  criadoEm: Date;

  @ApiProperty({
    example: 'dd/mm/yyyy',
    description: 'Data de atualização do usuário preenchida automaticamente',
  })
  @IsNotEmpty({
    message: 'Data de atualização do usuário preenchida automaticamente',
  })
  atualizadoEm: Date;
}
