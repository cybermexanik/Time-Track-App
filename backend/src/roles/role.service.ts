import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Users } from 'src/user/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role) throw new NotFoundException('Роль не найдена');

    user.role = role;
    return this.userRepository.save(user);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async updateRole(roleId: number, dto: CreateRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Роль не найдена');

    role.role_name = dto.role_name;
    return this.roleRepository.save(role);
  }

  async deleteRole(roleId: number): Promise<{ message: string }> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('Роль не найдена');

    await this.roleRepository.remove(role);
    return { message: 'Роль успешно удалена' };
  }
}