interface IImage {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  userId: number;
  like: ILike[];
  user?: IUser;
  lat: number | null;
  lng: number | null;
}

interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  likes?: ILike[];
  images?: IImage[];
}

interface IUserRating extends IUser {
  _count: {
    likes: number;
  };
}

interface ILike {
  id: number;
  createdAt: Date;
  userId: number;
  imageId: number;
}

interface IUserInput {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface IPasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface IGeo {
  lat: number;
  lng: number;
}

