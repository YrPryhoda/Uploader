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
  avatar: string | null;
  messageNotification?: IMessageNotification[];
}

interface IMessageNotification {
  id: number;
  userId: number;
  chatId: number;
}

interface IUserRating extends IUser {
  _likesCount: number;
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

interface IMessage {
  id: number;
  text: string;
  author?: IUser;
  chat?: IChat;
  authorId: number;
  chatId: number;
  status: string;
  createdAt: Date;
}

interface IMessageInput {
  text: string;
  authorId: number;
  recieverId: number;
  chatId: number;
}

interface IChat {
  id: number;
  createdAt: Date;
  members: IUser[];
  messages: IMessage[];
}

type IChatGeneral = Omit<IChat, "messages">;

