import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointmentservice extends Document {
  status: 'boolean';
  start_time: 'date';
}

const AppointmentserviceSchema: Schema = new Schema({
  status: {
    type: 'Boolean',
    require: true,
  },
  start_time: {
    type: 'Date',
    require: true,
  },
  appointment: {
    ref: 'Appointment',
    type: 'ObjectId',
  },
  service: {
    ref: 'Service',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAppointmentservice>(
  'Appointmentservice',
  AppointmentserviceSchema
);
