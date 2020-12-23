import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  date: 'date';
  start_time: 'date';
  end_time: 'date';
  break: 'number';
  status: 'number';
  published: 'boolean';
  notes: 'string';
}

const AppointmentSchema: Schema = new Schema({
  date: {
    type: 'Date',
    require: true,
  },
  start_time: {
    type: 'Date',
    require: true,
  },
  end_time: {
    type: 'Date',
    require: true,
  },
  break: {
    type: 'Number',
    require: true,
  },
  status: {
    type: 'Number',
    require: true,
  },
  published: {
    type: 'Boolean',
    require: true,
  },
  notes: {
    type: 'String',
    require: true,
  },
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
