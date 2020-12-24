import { CreateQuery } from 'mongoose';
import Contacttype, { IContacttype } from './../models/contacttype';
import L from '../../common/logger';
export class ContacttypeService {
  async findAll(): Promise<IContacttype[]> {
    try {
      return await Contacttype.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IContacttype> {
    try {
      return await Contacttype.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async showAllByPageTypes(
    page_type: any,
    profile: any
  ): Promise<IContacttype[]> {
    try {
      return await Contacttype.find({ page_type, profile });
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IContacttype>): Promise<IContacttype> {
    try {
      return await Contacttype.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IContacttype>, id: string): Promise<IContacttype> {
    try {
      return await Contacttype.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IContacttype> {
    try {
      return await Contacttype.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ContacttypeService();
