import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointedcarer extends Document {
  no?: 'string';
}

const AppointedcarerSchema: Schema = new Schema({
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
  appointment: {
    ref: 'Appointment',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAppointedcarer>(
  'Appointedcarer',
  AppointedcarerSchema
);
