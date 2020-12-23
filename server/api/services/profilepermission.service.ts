import { CreateQuery } from 'mongoose';
import Profilepermission, {
  IProfilepermission,
} from './../models/profilepermission';
import L from '../../common/logger';
export class ProfilepermissionService {
  async findAll(): Promise<IProfilepermission[]> {
    try {
      return await Profilepermission.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfilepermission> {
    try {
      return await Profilepermission.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<IProfilepermission>
  ): Promise<IProfilepermission> {
    try {
      return await Profilepermission.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IProfilepermission>,
    id: string
  ): Promise<IProfilepermission> {
    try {
      return await Profilepermission.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfilepermission> {
    try {
      return await Profilepermission.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfilepermissionService();
