import mongoose, { Schema, Document } from 'mongoose';

export interface IProfilerole extends Document {
  is_enabled: 'boolean';
}

const ProfileroleSchema: Schema = new Schema({
  is_enabled: {
    type: 'Boolean',
    require: false,
  },
  role: {
    ref: 'role',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IProfilerole>('Profilerole', ProfileroleSchema);
