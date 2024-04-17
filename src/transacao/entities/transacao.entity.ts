import { $Enums, Transacao } from '@prisma/client';

export class TransacaoEntity implements Transacao {
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  tipo: $Enums.TipoTransacao;
  usuarioId: number;
  criadoEm: Date;
  atualizadoEm: Date;
}
