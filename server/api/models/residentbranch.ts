import mongoose, { Schema, Document } from 'mongoose';

export interface IResidentbranch extends Document {
  is_enabled: 'boolean';
}

const ResidentbranchSchema: Schema = new Schema({
  is_enabled: {
    type: 'Boolean',
    require: false,
  },
  branch: {
    ref: 'Branch',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IResidentbranch>(
  'Residentbranch',
  ResidentbranchSchema
);
