const pgp = require('pg-promise')();

// Database connection details
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'myuser',
    password: 'mypassword'
});

// Function to create a table
async function createTable() {
    try {
        await db.none(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            )
        `);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

// Function to insert a user
async function insertUser(name, email) {
    try {
        const result = await db.one(
            'INSERT INTO users(name, email) VALUES($1, $2) RETURNING id',
            [name, email]
        );
        console.log(`User inserted with ID: ${result.id}`);
    } catch (error) {
        console.error('Error inserting user:', error);
    }
}

// Function to fetch all users
async function getUsers() {
    try {
        const users = await db.any('SELECT * FROM users');
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Run the functions
(async () => {
    await createTable();
    await insertUser('Alice', 'alice@example.com');
    await insertUser('Bob', 'bob@example.com');
    await getUsers();
})();
