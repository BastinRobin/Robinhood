import { CreateQuery } from 'mongoose';
import Permissions, { IPermissions } from './../models/permissions';
import L from '../../common/logger';
export class PermissionsService {
  async findAll(): Promise<IPermissions[]> {
    try {
      return await Permissions.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IPermissions> {
    try {
      return await Permissions.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IPermissions>): Promise<IPermissions> {
    try {
      return await Permissions.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IPermissions>, id: string): Promise<IPermissions> {
    try {
      return await Permissions.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IPermissions> {
    try {
      return await Permissions.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new PermissionsService();
