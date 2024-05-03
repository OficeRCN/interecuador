import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const roleExist = await this.roleRepository.findOne({ where: { rol: createRoleDto.rol } });
      if (roleExist) return new HttpException(`Rol ${createRoleDto.rol} already exist`, HttpStatus.CONFLICT);
      const role = this.roleRepository.create(createRoleDto);
      return this.roleRepository.save({ ...role });
    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async findAll() {
    try {
      const data = await this.roleRepository.find();

      if (!data || data.length == 0) return new HttpException("There is not data to show", HttpStatus.NO_CONTENT)

      return data;

    } catch (error) {

    }
  }

  async findOne(id: number) {
    try {

      const data = await this.roleRepository.findOne({ where: { id } })

      if (!data) return new HttpException(`Rol with id: ${id} not exist`, HttpStatus.NOT_FOUND);

      return data;

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {

      const rolExist = await this.roleRepository.findOne({ where: { id } })
      if (!rolExist) return new HttpException(`Rol with id: ${id} not exist`, HttpStatus.NOT_FOUND);
      return this.roleRepository.save({ ...rolExist, ...updateRoleDto })

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.roleRepository.findOne({ where: { id } })
      if (!data) return new HttpException(`Rol with id: ${id} not exist`, HttpStatus.NOT_FOUND);
      return await this.roleRepository.remove(data)
    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }
}
