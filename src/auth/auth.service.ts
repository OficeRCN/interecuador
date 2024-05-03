import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService

  ) { }

  async signIn(email: string, password: string) {
    try {

      const usuario = await this.usuarioRepository.findOne({
        where: {
          email
        },
        relations: { id_rol: true }
      });

      if (!usuario) return new HttpException("User not found", HttpStatus.NOT_FOUND)

      const validatedPassword = await bcrypt.compare(password, usuario.password)

      if (!validatedPassword) {
        throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
      }

      const payload = { email: usuario.email, rol: usuario.id_rol.rol };
      const token = await this.jwtService.signAsync(payload);

      const data = {
        user: usuario,
        token
      }

      return data;

    } catch (error) {
      return error instanceof Error ? error.message : error;
    }
  }


}
