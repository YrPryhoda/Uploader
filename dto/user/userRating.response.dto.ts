import { UserResponseDto } from "./user.response.dto";

export class UserRatingResponseDto extends UserResponseDto {
  private readonly _likesCount: number;

  constructor(user: IUserRating) {
    super(user);
    this._likesCount = user._likesCount;
  }
}

