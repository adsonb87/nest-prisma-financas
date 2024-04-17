import { $Enums } from '@prisma/client';
import { TransacaoEntity } from '../entities/transacao.entity';

export class CreateTransacaoDto extends TransacaoEntity {
  titulo: string;
  descricao: string;
  valor: number;
  tipo: $Enums.TipoTransacao;
  usuarioId: number;
  criadoEm: Date;
  atualizadoEm: Date;
}
