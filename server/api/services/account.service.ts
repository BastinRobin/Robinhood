import { CreateQuery } from 'mongoose';
import Account, { IAccount } from './../models/account';
import L from '../../common/logger';
export class AccountService {
  async findAll(): Promise<IAccount[]> {
    try {
      return await Account.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAccount> {
    try {
      return await Account.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAccount>): Promise<IAccount> {
    try {
      return await Account.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAccount>, id: string): Promise<IAccount> {
    try {
      return await Account.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAccount> {
    try {
      return await Account.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AccountService();
