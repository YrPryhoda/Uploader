import { NotFoundError } from "@prisma/client/runtime";
import { Like, PrismaClient, User } from "@prisma/client";
import { BadRequestException } from "next-api-decorators";

import { ChangePasswordUserDto } from "./../dto/user/change-password.user.dto";
import { CreateUserDto } from "./../dto/user/create.user.dto";

type UserRating = Omit<IUser, "images"> & {
  images: (IImage & { _count: { like: number }; like: Like[] })[];
};

class UserService {
  async all() {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return users;
  }

  async profile(id: number) {
    const prisma = new PrismaClient();
    try {
      const data = await prisma.user.findUnique({
        where: { id },
        include: {
          messageNotification: true,
          images: {
            orderBy: {
              createdAt: "desc"
            },
            include: { like: true }
          },
          likes: true
        }
      });
      await prisma.$disconnect();
      return data;
    } catch (error) {
      console.log(error);
      await prisma.$disconnect();
      throw new BadRequestException("User exists");
    }
  }

  async findByUnique(field: { [key: string]: string | number }) {
    const prisma = new PrismaClient();
    const data = await prisma.user.findUnique({
      where: field,
      include: {
        images: {
          orderBy: {
            createdAt: "desc"
          },
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

  async update(id: number, field: Partial<User>) {
    const prisma = new PrismaClient();
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...field
      }
    });
    await prisma.$disconnect();
    return updatedUser;
  }

  async rating() {
    const prisma = new PrismaClient();
    try {
      const users = await prisma.user.findMany({
        include: {
          images: {
            include: {
              like: true,
              _count: {
                select: { like: true }
              }
            }
          }
        }
      });

      const countUserLikes = (user: UserRating) => {
        return user.images.reduce((total, curr) => {
          total += curr._count.like;
          return total;
        }, 0);
      };

      const rating: IUserRating[] = users.reduce(
        (total: IUserRating[], current) => {
          const likes = countUserLikes(current);
          const updatedUser = { ...current, _likesCount: likes || 0 };
          total.push(updatedUser);
          return total;
        },
        []
      );

      rating.sort((u1, u2) => u2._likesCount - u1._likesCount);
      rating.length = 10;

      return rating;
    } finally {
      await prisma.$disconnect();
    }
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

