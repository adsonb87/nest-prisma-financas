import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { TransacaoRepository } from './repositories/transacao.repository';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Injectable()
export class TransacaoService {
  constructor(private readonly repository: TransacaoRepository) {}

  async create(createTransacaoDto) {
    try {
      const { categoria, ...transacao } = createTransacaoDto;
      return await this.repository.create(categoria, transacao);
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findAll() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findOne(id: number) {
    try {
      if (!id) {
        throw new NotFoundError('Id inválido');
      } else {
        return await this.repository.findOne(id);
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id: number, updateTransacaoDto: UpdateTransacaoDto) {
    try {
      if (!id) {
        throw new NotFoundError('Id inválido');
      } else if (!updateTransacaoDto) {
        throw new NotFoundError('Informações da Tag inválida');
      } else {
        return await this.repository.update(id, updateTransacaoDto);
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new NotFoundError('Id inválido');
      } else {
        return await this.repository.remove(id);
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }
}
