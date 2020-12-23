import mongoose, { Schema, Document } from 'mongoose';

export interface ICarerspacialities extends Document {
  name: 'string';
}

const CarerspacialitiesSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICarerspacialities>(
  'Carerspacialities',
  CarerspacialitiesSchema
);
