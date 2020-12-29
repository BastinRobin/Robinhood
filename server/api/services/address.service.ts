import { CreateQuery } from 'mongoose';
import Address, { IAddress } from './../models/address';
import L from '../../common/logger';
export class AddressService {
  async findAll(): Promise<IAddress[]> {
    try {
      return await Address.find().populate('addresstype');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAddress> {
    try {
      return await Address.findById(id).populate('addresstype');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAddress>): Promise<IAddress> {
    try {
      return await Address.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAddress>, id: string): Promise<IAddress> {
    try {
      return await Address.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAddress> {
    try {
      return await Address.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AddressService();
