import { UserResponseDto } from "./user.response.dto";

export class UserRatingResponseDto extends UserResponseDto {
  private readonly _count: {
    likes: number;
  };

  constructor(user: IUserRating) {
    super(user);
    this._count = user._count;
  }
}

