import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const currentUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    if (currentUser)
      throw new BadRequestException('Такой пользователь уже существует')

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      surname: createUserDto.surname,
      name: createUserDto.name,
      middlename: createUserDto.middlename,
    })

    const token = this.jwtService.sign({ email: createUserDto.email })

    return { user, token }
  }

  async findAll(): Promise<Omit<Users, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async findById(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.findById(id);
  
    user.name = updateUserDto.name ?? user.name;
    user.surname = updateUserDto.surname ?? user.surname;
    user.email = updateUserDto.email ?? user.email;
  
    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new BadRequestException('Не удалось обновить профиль');
    }
  }
}
