import { CreateQuery } from 'mongoose';
import Employmentdetails, {
  IEmploymentdetails,
} from './../models/employmentdetails';
import L from '../../common/logger';
export class EmploymentdetailsService {
  async findAll(): Promise<IEmploymentdetails[]> {
    try {
      return await Employmentdetails.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IEmploymentdetails> {
    try {
      return await Employmentdetails.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<IEmploymentdetails>
  ): Promise<IEmploymentdetails> {
    try {
      return await Employmentdetails.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IEmploymentdetails>,
    id: string
  ): Promise<IEmploymentdetails> {
    try {
      return await Employmentdetails.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IEmploymentdetails> {
    try {
      return await Employmentdetails.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new EmploymentdetailsService();
