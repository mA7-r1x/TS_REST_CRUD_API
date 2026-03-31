🚀 Project Overview: NestJS User & Task Management API
A high-performance, type-safe RESTful API built with NestJS, TypeORM, and SQLite. This project demonstrates a complete relational data model with automated cleanup and robust error handling. 
🛠️ Key Technical Attributes

    Persistent Storage: Uses SQLite for a zero-configuration, file-based relational database—perfect for portable local development.
    Object-Relational Mapping (ORM): Leveraged TypeORM to manage database interactions using TypeScript classes (Entities) instead of raw SQL.
    Relational Data Modeling: Implemented a One-to-Many relationship where a single User can own multiple Tasks.
    Automated Data Integrity: Configured Cascade Deletes (onDelete: 'CASCADE'), ensuring that all associated tasks are automatically removed when a user is deleted to prevent "orphaned" data.
    Eager Loading: Utilized relational joins to fetch users and their associated task lists in a single, efficient database query. 

⚡ Core Functions (CRUD Operations)

    User Management:
        Create: Register new users with unique email validation.
        Read: Fetch all users or a specific user by ID (including their tasks).
        Update: Modify user profiles using partial updates (PATCH).
        Delete: Permanently remove users and trigger cascading cleanup.
    Task Tracking:
        Assign: Link new tasks to a specific User ID.
        Track: Toggle task completion status (isCompleted).
        Manage: Independent task deletion. 

🛡️ Safety & Validation

    Input Validation: Used Data Transfer Objects (DTOs) and Validation Pipes to ensure incoming data is clean and correctly formatted.
    Conflict Handling: Implemented custom exception filters to catch database constraints (like duplicate emails) and return user-friendly 409 Conflict errors.
    Type Safety: Built entirely in TypeScript, providing end-to-end type safety from the controller to the database layer. 
