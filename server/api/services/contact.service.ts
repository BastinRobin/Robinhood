import { CreateQuery } from 'mongoose';
import Contact, { IContact } from './../models/contact';
import L from '../../common/logger';
export class ContactService {
  async findAll(): Promise<IContact[]> {
    try {
      return await Contact.find().populate('contact_type').populate('profile');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IContact> {
    try {
      return await Contact.findById(id)
        .populate('contact_type')
        .populate('profile');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async showAllByProfile(profile: any, page_type: any): Promise<IContact[]> {
    try {
      return await Contact.find({ profile, page_type })
        .populate('contact_type')
        .populate('profile');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IContact>): Promise<IContact> {
    try {
      return await Contact.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IContact>, id: string): Promise<IContact> {
    try {
      return await Contact.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IContact> {
    try {
      return await Contact.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ContactService();
