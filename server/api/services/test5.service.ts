import Connection from './../connections/mondo.db';
import L from '../../common/logger';
import { ObjectID } from 'mongodb';
export class ExampleService {
  async findAll(): Promise<unknown[]> {
    L.info('fetching all examples');
    try {
      const examples: unknown[] = await Connection.db
        .collection('example')
        .find()
        .toArray();
      return examples;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<unknown> {
    L.info(`fetching example for id ${id}`);
    try {
      const examples: unknown = await Connection.db
        .collection('example')
        .findOne({
          _id: new ObjectID(id),
        });
      return examples;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: any): Promise<unknown> {
    L.info(`creating example`);
    try {
      const example: unknown = await Connection.db
        .collection('example')
        .insertOne(body);
      return example;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: unknown, id: string): Promise<unknown> {
    L.info(`updating example for id ${id}`);
    try {
      const example: unknown = await Connection.db
        .collection('example')
        .findOneAndUpdate({ _id: new ObjectID(id) }, { $set: body });
      return example;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<unknown> {
    L.info(`deleting example for id ${id}`);
    try {
      const example: unknown = await Connection.db
        .collection('example')
        .deleteOne({ _id: new ObjectID(id) });
      return example;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ExampleService();

// let id = 0;
// interface Example {
//   id: number;
//   name: string;
// }

// const examples: Example[] = [
//   { id: id++, name: 'example 0' },
//   { id: id++, name: 'example 1' },
// ];

// export class ExamplesService {
//   all(): Promise<Example[]> {
//     L.info(examples, 'fetch all examples');
//     return Promise.resolve(examples);
//   }

//   byId(id: number): Promise<Example> {
//     L.info(`fetch example with id ${id}`);
//     return this.all().then((r) => r[id]);
//   }

//   create(name: string): Promise<Example> {
//     L.info(`create example with name ${name}`);
//     const example: Example = {
//       id: id++,
//       name,
//     };
//     examples.push(example);
//     return Promise.resolve(example);
//   }
// }

// export default new ExamplesService();
