import { CreateQuery } from 'mongoose';
import Appointment, { IAppointment } from './../models/appointment';
import L from '../../common/logger';
export class AppointmentService {
  async findAll(): Promise<IAppointment[]> {
    try {
      return await Appointment.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAppointment> {
    try {
      return await Appointment.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAppointment>): Promise<IAppointment> {
    try {
      return await Appointment.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAppointment>, id: string): Promise<IAppointment> {
    try {
      return await Appointment.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAppointment> {
    try {
      return await Appointment.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AppointmentService();
