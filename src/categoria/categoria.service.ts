import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CategoriaRepository } from './repositories/categoria.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly repository: CategoriaRepository) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.repository.create({
        ...createCategoriaDto,
        tipoCategoria: createCategoriaDto.tipoCategoria.toUpperCase(),
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

  async findCategoriaTipo(id, params) {
    try {
      if (!params) {
        throw new NotFoundError('Filtro vázio!');
      } else if (!id) {
        throw new NotFoundError('Id vázio!');
      } else {
        const { tipoCategoria, ...p } = params;
        return await this.repository.findCategoriaTipo(
          +id,
          tipoCategoria.toUpperCase(),
        );
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async findTipoCategoria(params) {
    try {
      if (!params) {
        throw new NotFoundError('Filtro vázio!');
      } else {
        const { tipoCategoria, ...p } = params;
        return await this.repository.findTipoCategoria(
          tipoCategoria.toUpperCase(),
        );
      }
    } catch (error) {
      throw new NotFoundError(`${error}`);
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      if (!id) {
        throw new NotFoundError('Id inválido');
      } else if (!updateCategoriaDto) {
        throw new NotFoundError('Informações da Tag inválida');
      } else {
        return await this.repository.update(id, {
          ...updateCategoriaDto,
          tipoCategoria: updateCategoriaDto.tipoCategoria.toUpperCase(),
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
