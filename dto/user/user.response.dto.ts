export class UserResponseDto {
  private readonly id: number;
  private readonly email: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly name: string;
  private readonly images: IImage[];
  private readonly likes?: ILike[];

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    if (user.images) {
      this.images = user.images;
    }
    this.likes = user.likes;
  }
}

