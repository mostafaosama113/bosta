const client = require('../clients/postgresClient');

class Borrower {
    // Create a new borrower
    static async create(first_name, last_name, email, password) {
        const query = `
            INSERT INTO borrowers (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [first_name, last_name, email, password];
        try {
            const res = await client.query(query, values);
            return res.rows[0];  // Return the newly created borrower
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error creating borrower');
        }
    }

    // Get all borrowers
    static async getAll() {
        const query = 'SELECT * FROM borrowers WHERE is_deleted = FALSE;';
        try {
            const res = await client.query(query);
            return res.rows;  // Return all active borrowers
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching borrowers');
        }
    }

    // Soft delete a borrower
    static async delete(borrower_id) {
        const query = `
            UPDATE borrowers
            SET is_deleted = TRUE
            WHERE borrower_id = $1;
        `;
        const values = [borrower_id];
        try {
            await client.query(query, values);
            return { borrower_id };  // Return the borrower_id of the soft-deleted borrower
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error deleting borrower');
        }
    }
    static async getByEmail(email) {
        const query = 'SELECT * FROM borrowers WHERE email = $1 AND is_deleted = FALSE;';
        const values = [email];
        try {
            const res = await client.query(query, values);
            if (res.rows.length === 0) {
                throw null;
            }
            return res.rows[0];  // Return the borrower found by email
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching borrower by email');
        }
    }
}

module.exports = Borrower;