import mongoose, { Schema, Document } from 'mongoose';

export interface IJobtype extends Document {
  name: 'string';
}

const JobtypeSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
});

export default mongoose.model<IJobtype>('Jobtype', JobtypeSchema);
