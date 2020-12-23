import mongoose, { Schema, Document } from 'mongoose';

export interface IProfiletype extends Document {
  name: 'string';
}

const ProfiletypeSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
});

export default mongoose.model<IProfiletype>('Profiletype', ProfiletypeSchema);
