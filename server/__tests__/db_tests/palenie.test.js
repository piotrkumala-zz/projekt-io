const { Pool } = require('pg');

describe('db: palenie testing', () => {

    let pgPool;

    beforeAll(() => {
        pgPool = new Pool({
            connectionString: process.env.ELEPHANTSQL_URL || "postgres://nviwmkcg:4-G6tFZ1xeDNz_W6f9C-qWQTJo8sq6Ww@drona.db.elephantsql.com:5432/nviwmkcg"
        });
    });

    afterAll(async () => {
        await pgPool.end();
    });

    it('DELETE test', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query('DELETE FROM palenie WHERE ilosc > 0 RETURNING email');
            expect(rows[0]["email"]).toBe("adam@gmail.com");

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    });

    it('INSERT test', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query('INSERT INTO palenie (ilosc) VALUES (2115) RETURNING ilosc');
            expect(rows[0]["ilosc"]).toBe(2115);

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    });

    it('SELECT test', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query('SELECT * FROM palenie WHERE ilosc > 0');
            expect(rows[0]["email"]).toBe("adam@gmail.com");

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    });

});