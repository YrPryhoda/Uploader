## This project created with the purpose of improving technical skill in NextJS and SQL

[![Watch the video](https://i.imgur.com/vKb2F1B.png)](https://drive.google.com/file/d/1R6qTXPLwNZIoPgZ9sb2B7FBpLqIJ7hLR/view?usp=sharing)


### Tricks and technologies used in this application:
* TypeScript
* NextJS
* React
* Redux
* Server side rendering
* Static site generation
* Incremental static regeneration
* SCSS
* Prisma ORM
* MySQL database
* Leaflet maps

### To run this application on your local machine:
 - Clone repository;
 - A few steps according to .env file:

		1. Create MySQL database with name "next-images";
		2. Create SQL user login: homeroot and password: homeroot2022. Or change DATABASE_URL variable to your own credentials:

 - Run command **npm run prisma:migrate** - to generate necessery tables in database;
 - Run command **npm run prisma:seed** - to fill in tables with mock data;
 - Run command **npm run dev** - to start development server on localhost:3000.
