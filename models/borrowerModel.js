const client = require('../clients/postgresClient');

class Borrower {
    static async create(first_name, last_name, email, password) {
        const query = `
            INSERT INTO borrowers (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [first_name, last_name, email, password];
        try {
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error creating borrower');
        }
    }


    static async getAll() {
        const query = 'SELECT * FROM borrowers WHERE is_deleted = FALSE;';
        try {
            const res = await client.query(query);
            return res.rows;
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching borrowers');
        }
    }

    static async delete(borrower_id) {
        const query = `
            UPDATE borrowers
            SET is_deleted = TRUE
            WHERE borrower_id = $1;
        `;
        const values = [borrower_id];
        try {
            await client.query(query, values);
            return { borrower_id }; 
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
                return null;
            }
            return res.rows[0]; 
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching borrower by email');
        }
    }
    static async update(borrower_id, updatedData) {
        const fields = [];
        const values = [];
        let index = 1;

        if (updatedData.first_name) {
            fields.push(`first_name = $${index++}`);
            values.push(updatedData.first_name);
        }
        if (updatedData.email) {
            fields.push(`email = $${index++}`);
            values.push(updatedData.email);
        }
        if (updatedData.last_name) {
            fields.push(`last_name = $${index++}`);
            values.push(updatedData.last_name);
        }
        if (updatedData.password) {
            fields.push(`password = $${index++}`);
            values.push(updatedData.password);
        }
       
        if (fields.length === 0) {
            throw new Error('No valid fields to update');
        }

        values.push(borrower_id);

        const query = `
            UPDATE borrowers
            SET ${fields.join(', ')}
            WHERE borrower_id = $${index}
            RETURNING *;
        `;

        try {
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error updating borrower');
        }
    }
}

module.exports = Borrower;