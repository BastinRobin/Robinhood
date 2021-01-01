import mongoose, { Schema, Document } from 'mongoose';

export interface IBranch extends Document {
  name: 'string';
  latitude: 'string';
  longitude: 'string';
  postal_code: 'string';
  town: 'string';
  street: 'string';
  country: 'string';
  is_enabled: 'boolean';
}

const BranchSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  latitude: {
    type: 'String',
    require: true,
  },
  longitude: {
    type: 'String',
    require: true,
  },
  postal_code: {
    type: 'String',
    require: true,
  },
  town: {
    type: 'String',
    require: false,
  },
  street: {
    type: 'String',
    require: true,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
  country: {
    ref: 'String',
    require: false,
  },
});

export default mongoose.model<IBranch>('Branch', BranchSchema);
