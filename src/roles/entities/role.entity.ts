import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rol: string;

    @OneToMany(() => Usuario, (usuario) => usuario.id_rol)
    id_usuarios: Usuario[];

}
