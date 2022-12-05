interface IImage {
  id: number;
  user: any;
  title: string;
  description: string;
  createdAt: Date;
  userId: number;
}

interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
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
	lat: number,
	lng: number
}