import assert from 'assert';
import connect from '@moped/db-pg';
import {SQLQuery} from '@moped/sql';
import loadRaw from './database-connection';

export default function load(tables) {
  if (process.env.DATABASE_URL) {
    const db = connect(process.env.DATABASE_URL);
    Object.keys(tables).forEach(tableName => {
      db.query(tables[tableName]).catch(() => {
        // table may already exist, you must run migrations
        // manually in production
      });
    });
    return db.query.bind(db);
  } else {
    Object.keys(tables).forEach(tableName => {
      assert(tables[tableName] instanceof SQLQuery);
    });
    const db = loadRaw(tables);
    return async query => {
      assert(query instanceof SQLQuery);
      return db(query);
    };
  }
}
