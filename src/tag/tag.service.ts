import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './repositories/tag.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TagService {
  constructor(private readonly repository: TagRepository) {}

  async create(createTagDto: CreateTagDto) {
    try {
      return await this.repository.create({
        id: createTagDto.id,
        nome: createTagDto.nome.toUpperCase(),
      });
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

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      if (!id) {
        throw new NotFoundError('Id inválido');
      } else if (!updateTagDto) {
        throw new NotFoundError('Informações da Tag inválida');
      } else {
        return await this.repository.update(id, {
          nome: updateTagDto.nome.toUpperCase(),
        });
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
