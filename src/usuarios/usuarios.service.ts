import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { HashGenerator } from 'src/helper/HashGenerator';


@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {

      const emailExist = await this.usuarioRepository.findOne({
        where: {
          email: createUsuarioDto.email
        }
      });
      if (emailExist) return new HttpException("The email is already in use", HttpStatus.CONFLICT);

      const hashedPassword = HashGenerator(createUsuarioDto.password)

      const newUsuario = this.usuarioRepository.create(createUsuarioDto);

      const data = await this.usuarioRepository.save({ ...newUsuario, password: hashedPassword });
      return data;

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async findAll() {
    try {
      const data = await this.usuarioRepository.find({ relations: ["id_rol"] });
      if (!data || data.length == 0) return new HttpException("There are not data fot users", HttpStatus.NOT_FOUND)
      return data;
    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async findOne(id: number) {
    try {

      const data = await this.usuarioRepository.findOne({
        where: { id }
      })

      if (!data) return new HttpException(`User with id: ${id} not exist`, HttpStatus.NOT_FOUND);

      return data;

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {

      const data = await this.usuarioRepository.findOne({
        where: { id }
      })

      if (!data) return new HttpException(`User with id: ${id} not exist`, HttpStatus.NOT_FOUND);

      const hashedPassword = HashGenerator(updateUsuarioDto.password)

      const updatedData = this.usuarioRepository.merge(data, updateUsuarioDto);
      return await this.usuarioRepository.save({ ...updatedData, password: hashedPassword });


    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }

  async remove(id: number) {
    try {

      const data = await this.usuarioRepository.findOne({
        where: { id }
      })

      if (!data) return new HttpException(`User with id: ${id} not exist`, HttpStatus.NOT_FOUND);

      return await this.usuarioRepository.remove(data);

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }
}
