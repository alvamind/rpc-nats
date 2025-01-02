# rpc-nats-example

This repository demonstrates a practical application of the npm `rpc-nats-alvamind` library for building microservices using NATS as the message broker. It showcases a simple e-commerce domain with categories and products, demonstrating how to set up RPC communication between services.

## Features

*   **RPC Communication:** Utilizes `rpc-nats-alvamind` for seamless remote procedure calls.
*   **NATS Message Broker:** Employs NATS for reliable message passing.
*   **Dependency Injection:** Uses `tsyringe-neo` for managing dependencies.
*   **Prisma ORM:** Leverages Prisma for database interactions (PostgreSQL).
*   **Elysia.js:** Implements a simple API server using Elysia.js for testing and demonstration.
*   **TRPC:** Exposes a simple API endpoint using TRPC.

## Project Structure

```
rpc-nats-example/
├── src/
│   ├── common/             # Common utilities (e.g., logger)
│   ├── config/             # Configuration files
│   │   ├── dependency.config.ts     # Dependency injection setup
│   │   ├── general.config.ts        # General app settings
│   │   └── trpc.config.ts           # TRPC configuration
│   ├── database/           # Database related scripts
│   │   └── seed.ts          # Database seeding script
│   ├── module/             # Feature modules
│   │   ├── category/
│   │   │   ├── category.controller.ts   # Category controller
│   │   │   ├── category.service.ts      # Category service
│   │   │   └── category.route.ts        # Category TRPC route
│   │   ├── product/
│   │   │   ├── product.controller.ts    # Product controller
│   │   │   ├── product.service.ts       # Product service
│   │   │   └── product.route.ts         # Product TRPC route
│   ├── persistence/        # Persistence related code
│   │   └── prisma/
│   │       └── prisma-client.ts   # Prisma client initialization
│   ├── types/              # TypeScript types
│   │   └── general.type.ts      # General type definitions
│   ├── elysia.context.ts   # Elysia context configuration
│   ├── app.module.ts       # App initialization module
│   └── index.ts            # Main entry point of the application
├── .env                    # Environment variables
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd rpc-nats-example
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file at the root of the project based on `.env.example`
    *   Configure your PostgreSQL connection string, NATS URL, and other environment variables as needed.

4.  **Start the services using docker-compose:**

    ```bash
    docker compose up -d
    ```

5.  **Generate Prisma client:**

    ```bash
     bunx prisma generate
    ```

6.  **Apply database migrations:**

    ```bash
    bunx prisma db push --force-reset
    ```

7.  **Seed the database:**

    ```bash
    bun run seed
    ```

## Running the application

```bash
bun run dev
```

The application will start and be accessible at `http://localhost:3000`.

## Usage

### API Endpoints

*   **TRPC Endpoints:** Access via any TRPC client. Please check `src/config/trpc.config.ts`, `src/module/category/category.route.ts` and `src/module/product/product.route.ts` for the available endpoints.
*   **GET /test:** A simple endpoint that retrieves a product with its category using the controller method directly on the elysia app, serving as a direct test for the RPC calls.

### RPC Calls

*   The application uses `rpc-nats-alvamind` to enable communication between the `ProductController` and `CategoryController` using NATS.
*   The `ProductController` calls the `CategoryController` using a controller proxy. This demonstrates how methods across different controllers can be invoked via NATS.
*   All controller methods are exposed as NATS subjects, following the configured `subjectPattern` (default: `ClassName-MethodName`).

### Testing

You can test the application using the provided example route:
`http://localhost:3000/test`

### Explanation of Key Components

*   **`src/app.module.ts`:** Initializes the application, connects to NATS, and registers controllers using `NatsRpc`.
*   **`src/config/dependency.config.ts`:** Sets up dependency injection using `tsyringe-neo`. It also registers the `NatsRpc` instance.
*   **`src/module/category/` and `src/module/product/`:** Contain the controllers and services for the category and product domain logic, demonstrating how to structure microservices.
*   **`rpc-nats-alvamind` (`REF2454254`)**: This library facilitates RPC communication over NATS. It automatically registers methods as NATS subjects and handles serialization/deserialization.
*   **`NatsRpc` Class:** This class from `rpc-nats-alvamind` is used to establish connection to NATS, register and call controllers.
*   **Controller Proxy:** Created by `rpc-nats-alvamind` to make it easier to make RPC calls to other controllers, making it feel like you are calling local method

## Notes

*   Ensure that the PostgreSQL and NATS containers are up and running before starting the application.
*   Check the console logs for details about NATS connection and any errors that may occur.

## License

This project is licensed under the MIT License.
