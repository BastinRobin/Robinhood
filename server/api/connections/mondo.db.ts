import { MongoClient, db } from 'mongodb';

class Connection {
  db: db;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async connect(conn, onSuccess, onFailure) {
    try {
      const connection = await MongoClient.connect(conn.url, {
        useNewUrlParser: true,
      });
      this.db = connection.db(conn.dbName);
      onSuccess();
    } catch (ex) {
      onFailure(ex);
    }
  }
}

export default new Connection();
