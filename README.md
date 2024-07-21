# Peworld Backend

Peworld is a leading platform for finding and connecting the best talents with quality companies. We are committed to shaping the future in the Fourth Industrial Revolution by providing access to the finest talent network and an efficient recruitment experience.

## Documentation

⚡[Peworld Backend](https://documenter.getpostman.com/view/13368987/2sA3dskYxF)

## Tech Stack

**Programming language:** JavaScript (Node JS)

**Framework:** Express JS

**Database:** PostgreSQL

**API Testing:** Postman

**Authentication:** JWT (JSON Web Tokens)

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,postgres,redis,postman,vercel)](https://skillicons.dev)

## Features

- Create user Worker/Recruiter
- Edit Profile User
- Worker can Create, Read, Update, Delete Portfolio and Experience
- Detail Worker, Hire Worker, Add Skill Worker

## Project Structure

```
└── 📁backend
    └── .LICENSE
    └── .env
    └── .gitignore
    └── eslint.config.mjs
    └── index.js
    └── package-lock.json
    └── package.json
    └── README.md
    └── 📁src
        └── 📁configs
            └── cloudinary.js
            └── db.js
            └── redis.js
        └── 📁controller
            └── auth.js
            └── experience.js
            └── hire.js
            └── portofolio.js
            └── recruiters.js
            └── skill.js
            └── upload.js
            └── workers.js
        └── 📁helper
            └── auth.js
            └── common.js
        └── 📁middlewares
            └── auth.js
            └── redis.js
            └── upload.js
        └── 📁models
            └── auth.js
            └── experience.js
            └── hire.js
            └── portofolio.js
            └── recruiters.js
            └── skill.js
            └── workers.js
        └── 📁routes
            └── auth.js
            └── experience.js
            └── hire.js
            └── portfolio.js
            └── recruiters.js
            └── skill.js
            └── workers.js
            └── upload.js
        └── 📁utils
            └── cloudinary.js
    └── 📁upload
    └── vercel.json
```

## Installation

#### Clone this repository :

```bash
  git clone https://github.com/SwitchZer/hire-job-backend.git
```

#### Install Module on Project Directory :

```bash
  npm install
```

#### Start the project :

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USERNAME`

`DB_HOST`

`DB_NAME`

`DB_PASSWORD`

`DB_PORT`

`PORT`

`CLOUD_NAME`

`CLOUD_API_KEY`

`CLOUD_API_SECRET`

`SECRET_KEY_JWT`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel Free to Contact me using [alfredcnzagoto@gmail.com](alfredcnzagoto@gmail.com).

## Contributing

Contributions are always welcome!

## Related Project

Project Related to this Project.

[Peworld Web](https://github.com/SwitchZer/Hire-Job-App)

[Peworld Mobile](https://github.com/SwitchZer/PeWorld-Mobile)
