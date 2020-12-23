import { CreateQuery } from 'mongoose';
import role, { IRole } from './../models/role';
import L from '../../common/logger';
export class roleService {
  async findAll(): Promise<IRole[]> {
    try {
      return await role.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IRole> {
    try {
      return await role.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IRole>): Promise<IRole> {
    try {
      return await role.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IRole>, id: string): Promise<IRole> {
    try {
      return await role.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IRole> {
    try {
      return await role.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new roleService();
