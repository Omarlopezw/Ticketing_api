import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userReposity: Repository<User>) { };

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userReposity.create({
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      email: createUserDto.mail,
      password: createUserDto.password
    })
    return await this.userReposity.save(newUser);
  }

  findAll() {
    return this.userReposity.find();
  }

  findOne(id: number) {
    return this.userReposity.findOne({
      where: {
        id
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userReposity.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userReposity.delete(id);
  }
}
