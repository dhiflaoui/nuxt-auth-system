# Building a Custom Authentication System with JWT in Nuxt 3

## Description

This project is a Nuxt.js authentication system that utilizes JSON Web Tokens (JWT) for secure user authentication. It provides a framework for user management, including registration, login, and session handling.

## Installation

To install the project, run the following command:

```bash
npm install
```

## Usage

To start the development server, use:

```bash
npm run dev
```

## Database Setup

This project uses Prisma for database management. To set up the database, run the following commands:

1. **Migrate the database**:

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Generate the Prisma client**:
   ```bash
   npx prisma generate
   ```

## Key Dependencies

- **jsonwebtoken**: For handling JWTs.
- **@prisma/client**: For database interactions.
- **bcryptjs**: For hashing passwords.

## Contributing

Contributions are welcome! Please create a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
