import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Hasher } from '../hasher/hash';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userReposity: Repository<User>,
    private hasher: Hasher) { };

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hasher.hash(createUserDto.password);

    const newUser = this.userReposity.create({
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      email: createUserDto.mail,
      password: hashedPassword
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
