import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  value: 'number';
}

const RatingSchema: Schema = new Schema({
  value: {
    type: 'Number',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IRating>('Rating', RatingSchema);
