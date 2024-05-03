import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: "usuario" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, (roles) => roles.id_usuarios)
    @JoinColumn({ name: "id_rol" })
    id_rol: Role;
}
