import { NotFoundError } from "@prisma/client/runtime";
import { PrismaClient } from "@prisma/client";
import { BadRequestException } from "next-api-decorators";

import { ChangePasswordUserDto } from "./../dto/user/change-password.user.dto";
import { CreateUserDto } from "./../dto/user/create.user.dto";

class UserService {
  async all() {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return users;
  }

  async findByUnique(field: { [key: string]: string | number }) {
    const prisma = new PrismaClient();
    const data = await prisma.user.findUnique({
      where: field,
      include: {
        images: {
          include: { like: true }
        },
        likes: true
      }
    });
    await prisma.$disconnect();
    return data;
  }

  async create(input: Omit<CreateUserDto, "confirmPassword">) {
    const prisma = new PrismaClient();
    const existedUser = await this.findByUnique({ email: input.email });

    if (existedUser) {
      throw new BadRequestException("User exists");
    }

    const createdUser = await prisma.user.create({ data: input });
    await prisma.$disconnect();
    return createdUser;
  }

  async login(email: string, password: string) {
    const prisma = new PrismaClient();
    const user = await this.findByUnique({ email });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isPasswordCorrect = user.password === password;

    if (!isPasswordCorrect) {
      throw new BadRequestException("Wrond credentials");
    }

    await prisma.$disconnect();
    return user;
  }

  async changePassword(id: number, body: ChangePasswordUserDto) {
    const prisma = new PrismaClient();

    const user = await this.findByUnique({ id });

    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    if (user.password !== body.oldPassword) {
      throw new BadRequestException("Wrong credentials");
    }

    if (body.newPassword !== body.confirmNewPassword) {
      throw new BadRequestException("Password are not equal");
    }

    const result = await prisma.user.update({
      where: { id },
      data: { password: body.newPassword }
    });
    await prisma.$disconnect();
    return result;
  }
}

export default new UserService();

