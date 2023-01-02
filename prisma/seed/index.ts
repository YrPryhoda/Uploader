import { Image, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

interface FakeUser {
  name: string;
  email: string;
  password: string;
  images?: FakeImage[];
}

interface FakeImage {
  title: string;
  description: string;
  lat: number;
  lng: number;
  userId: number;
}

interface FakeLike {
  userId: number;
  imageId: number;
}

function createRandomUser(): FakeUser {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: "testprisma"
  };
}

function createRandomImages(userId: number): FakeImage {
  return {
    title: faker.image.image(640, 480, true),
    description: faker.lorem.words(),
    userId,
    lat: faker.datatype.number({ min: 44, max: 52, precision: 0.2 }),
    lng: faker.datatype.number({ min: 29, max: 39, precision: 0.2 })
  };
}

function createRandomLike(users: User[], images: Image[]): FakeLike {
  return {
    userId: getRandonId(users),
    imageId: getRandonId(images)
  };
}

const getRandonId = <T extends { id: number }>(arr: T[]) => {
  const index = Math.round(Math.random() * arr.length - 1);
  return arr[index]?.id;
};

const prisma = new PrismaClient();
async function main() {
  const USERS: FakeUser[] = [];
  const IMAGES: FakeImage[] = [];
  const LIKES: FakeLike[] = [];

  Array.from({ length: 20 }).forEach(() => {
    USERS.push(createRandomUser());
  });

  await prisma.user.createMany({ data: USERS });
  const createdUsers = await prisma.user.findMany();

  Array.from({ length: 20 }).forEach(() => {
    const userId = getRandonId(createdUsers);
    IMAGES.push(createRandomImages(userId));
  });

  await prisma.image.createMany({ data: IMAGES });
  const createdImages = await prisma.image.findMany();

  const existedLikes = await prisma.like.findMany();
  const isLikeExist = (like: FakeLike) => {
    const myFind = (where: FakeLike[]) =>
      where.find(
        (el) => el.imageId === like.imageId && el.userId === like.userId
      );
    const localLikeExist = myFind(LIKES);
    const savedLikeExist = myFind(existedLikes);

    return localLikeExist || savedLikeExist;
  };

  await Promise.all([
    Array.from({ length: 20 }).forEach(async () => {
      const likeInput = createRandomLike(createdUsers, createdImages);
      const isAlreadyCreated = isLikeExist(likeInput);

      if (!isAlreadyCreated) {
        LIKES.push(likeInput);
      }
    })
  ]);

  await prisma.like.createMany({ data: LIKES });
}
main()
  .then(async () => {
    console.log("Seed complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

