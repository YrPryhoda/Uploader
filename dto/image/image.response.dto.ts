import { UserResponseDto } from "./../user/user.response.dto";
export class ImageResponseDto {
  readonly id: number;
  readonly title: string;
  readonly createdAt: Date;
  readonly description: string;
  readonly lat: number | null;
  readonly like: ILike[];
  readonly lng: number | null;
  readonly user: UserResponseDto;
  readonly userId: number;

  constructor(image: IImage) {
    this.lng = image.lng;
    this.title = image.title;
    this.description = image.description;
    this.lat = image.lat;
    this.id = image.id;
    this.userId = image.userId;
    this.createdAt = image.createdAt;
    this.like = image.like;
    if (image.user) {
      this.user = image.user;
    }
  }
}

