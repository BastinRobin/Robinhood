import { CreateQuery } from 'mongoose';
import Appointedcarer, { IAppointedcarer } from './../models/appointedcarer';
import L from '../../common/logger';
export class AppointedcarerService {
  async findAll(): Promise<IAppointedcarer[]> {
    try {
      return await Appointedcarer.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAppointedcarer> {
    try {
      return await Appointedcarer.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAppointedcarer>): Promise<IAppointedcarer> {
    try {
      return await Appointedcarer.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAppointedcarer>, id: string): Promise<IAppointedcarer> {
    try {
      return await Appointedcarer.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAppointedcarer> {
    try {
      return await Appointedcarer.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AppointedcarerService();
