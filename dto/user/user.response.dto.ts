export class UserResponseDto {
  readonly id: number;
  readonly email: string;
  readonly avatar: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly name: string;
  readonly images?: IImage[];
  readonly likes?: ILike[];

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    if (user.images) {
      this.images = user.images;
    }
    this.likes = user.likes;
  }
}

