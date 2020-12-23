import mongoose, { Schema, Document } from 'mongoose';

export interface IAvailability extends Document {
  date: 'date';
  status: 'number';
}

const AvailabilitySchema: Schema = new Schema({
  date: {
    type: 'Date',
    require: true,
  },
  status: {
    type: 'Number',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAvailability>(
  'Availability',
  AvailabilitySchema
);
