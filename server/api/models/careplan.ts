import mongoose, { Schema, Document } from 'mongoose';

export type ICareplan = Document;

const CareplanSchema: Schema = new Schema({
  service: {
    ref: 'Service',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICareplan>('Careplan', CareplanSchema);
