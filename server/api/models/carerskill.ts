import mongoose, { Schema, Document } from 'mongoose';

export interface ICarerskill extends Document {
  name: 'string';
}

const CarerskillSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICarerskill>('Carerskill', CarerskillSchema);
