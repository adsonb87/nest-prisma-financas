import { $Enums, Transacao } from '@prisma/client';

export class TransacaoEntity implements Transacao {
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  usuarioId: number;
  tipoTransacao: $Enums.Tipo;
  categoriaId: number;
  criadoEm: Date;
  atualizadoEm: Date;
}
