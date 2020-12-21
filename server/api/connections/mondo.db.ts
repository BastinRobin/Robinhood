import mongoose from 'mongoose';
class Connection {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async connect(conn, onSuccess, onFailure) {
    try {
      await mongoose.connect(conn.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      onSuccess();
    } catch (ex) {
      onFailure(ex);
    }
  }
}

export default new Connection();
