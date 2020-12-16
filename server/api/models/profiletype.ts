import mongoose, { Schema, Document } from 'mongoose';

export interface IProfileType extends Document {
  name: 'string';
}

const ProfileTypeSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
});

export default mongoose.model<IProfileType>('ProfileType', ProfileTypeSchema);
