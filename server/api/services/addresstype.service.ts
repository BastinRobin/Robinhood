import Connection from './../connections/mondo.db';
import L from '../../common/logger';
import { ObjectID } from 'mongodb';
export class AddresstypeService {
  async findAll(): Promise<unknown[]> {
    L.info('fetching all addresstypes');
    try {
      const addresstypes: unknown[] = await Connection.db
        .collection('addresstype')
        .find()
        .toArray();
      return addresstypes;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<unknown> {
    L.info(`fetching addresstype for id ${id}`);
    try {
      const addresstypes: unknown = await Connection.db
        .collection('addresstype')
        .findOne({
          _id: new ObjectID(id),
        });
      return addresstypes;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: any): Promise<unknown> {
    L.info(`creating addresstype`);
    try {
      const addresstype: unknown = await Connection.db
        .collection('addresstype')
        .insertOne(body);
      return addresstype;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: unknown, id: string): Promise<unknown> {
    L.info(`updating addresstype for id ${id}`);
    try {
      const addresstype: unknown = await Connection.db
        .collection('addresstype')
        .findOneAndUpdate({ _id: new ObjectID(id) }, { $set: body });
      return addresstype;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<unknown> {
    L.info(`deleting addresstype for id ${id}`);
    try {
      const addresstype: unknown = await Connection.db
        .collection('addresstype')
        .deleteOne({ _id: new ObjectID(id) });
      return addresstype;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AddresstypeService();

// let id = 0;
// interface Addresstype {
//   id: number;
//   name: string;
// }

// const addresstypes: Addresstype[] = [
//   { id: id++, name: 'addresstype 0' },
//   { id: id++, name: 'addresstype 1' },
// ];

// export class AddresstypesService {
//   all(): Promise<Addresstype[]> {
//     L.info(addresstypes, 'fetch all addresstypes');
//     return Promise.resolve(addresstypes);
//   }

//   byId(id: number): Promise<Addresstype> {
//     L.info(`fetch addresstype with id ${id}`);
//     return this.all().then((r) => r[id]);
//   }

//   create(name: string): Promise<Addresstype> {
//     L.info(`create addresstype with name ${name}`);
//     const addresstype: Addresstype = {
//       id: id++,
//       name,
//     };
//     addresstypes.push(addresstype);
//     return Promise.resolve(addresstype);
//   }
// }

// export default new AddresstypesService();
