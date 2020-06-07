const { Pool } = require('pg');

describe('db: jedzenie testing', () => {

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

            const { rows } = await client.query('DELETE FROM jedzenie WHERE kalorie = 420 RETURNING nazwa');
            expect(rows[0]["nazwa"]).toBe("Test");

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

            const { rows } = await client.query('INSERT INTO jedzenie (nazwa, kalorie, z_bazy) VALUES (123,2115, 0) RETURNING nazwa');
            expect(rows[0]["nazwa"]).toBe("123");

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

            const { rows } = await client.query('SELECT nazwa FROM jedzenie WHERE kalorie = 420');
            expect(rows[0]["nazwa"]).toBe("Test");

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    });

});