import { CreateQuery } from 'mongoose';
import Appointmentservice, {
  IAppointmentservice,
} from './../models/appointmentservice';
import L from '../../common/logger';
export class AppointmentserviceService {
  async findAll(): Promise<IAppointmentservice[]> {
    try {
      return await Appointmentservice.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAppointmentservice> {
    try {
      return await Appointmentservice.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<IAppointmentservice>
  ): Promise<IAppointmentservice> {
    try {
      return await Appointmentservice.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IAppointmentservice>,
    id: string
  ): Promise<IAppointmentservice> {
    try {
      return await Appointmentservice.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAppointmentservice> {
    try {
      return await Appointmentservice.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AppointmentserviceService();
