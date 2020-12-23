import mongoose, { Schema, Document } from 'mongoose';

export type ICareservice = Document;

const CareserviceSchema: Schema = new Schema({
  service: {
    ref: 'Service',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICareservice>('Careservice', CareserviceSchema);
