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

            const { rows } = await client.query('DELETE FROM posiłek WHERE porcja_id = 1 RETURNING email');
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

            const { rows } = await client.query('INSERT INTO posiłek (porcja_id) VALUES (2115) RETURNING porcja_id');
            expect(rows[0]["porcja_id"]).toBe(2115);

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

            const { rows } = await client.query('SELECT email FROM posiłek WHERE porcja_id = 1');
            expect(rows[0]["email"]).toBe("adam@gmail.com");

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    });

});