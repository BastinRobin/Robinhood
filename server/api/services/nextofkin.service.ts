import { CreateQuery } from 'mongoose';
import Nextofkin, { INextofkin } from './../models/nextofkin';
import L from '../../common/logger';
export class NextofkinService {
  async findAll(): Promise<INextofkin[]> {
    try {
      return await Nextofkin.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<INextofkin> {
    try {
      return await Nextofkin.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<INextofkin>): Promise<INextofkin> {
    try {
      return await Nextofkin.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<INextofkin>, id: string): Promise<INextofkin> {
    try {
      return await Nextofkin.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<INextofkin> {
    try {
      return await Nextofkin.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new NextofkinService();
