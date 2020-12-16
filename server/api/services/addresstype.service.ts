import { CreateQuery } from 'mongoose';
import AddressType, { IAddressType } from './../models/addresstype';
import L from '../../common/logger';
export class AddresstypeService {
  async findAll(): Promise<IAddressType[]> {
    L.info('fetching all addresstypes');
    try {
      return await AddressType.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAddressType> {
    L.info(`fetching addresstype for id ${id}`);
    try {
      return await AddressType.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAddressType>): Promise<IAddressType> {
    L.info(`creating addresstype`);
    try {
      return await AddressType.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IAddressType>,
    id: string
  ): Promise<IAddressType> {
    L.info(`updating addresstype for id ${id}`);
    try {
      return await AddressType.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAddressType> {
    L.info(`deleting addresstype for id ${id}`);
    try {
      return await AddressType.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AddresstypeService();
