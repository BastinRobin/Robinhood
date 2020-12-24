import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  address1: 'string';
  address2: 'string';
  city: 'string';
  postal_code: 'string';
  latitude: 'string';
  longitude: 'string';
  country: 'string';
  profile: 'string';
}

const AddressSchema: Schema = new Schema({
  address1: {
    type: 'String',
    require: true,
  },
  address2: {
    type: 'String',
    require: false,
  },
  city: {
    type: 'String',
    require: true,
  },
  postal_code: {
    type: 'String',
    require: true,
  },
  country: {
    type: 'String',
    require: false,
  },
  latitude: {
    type: 'String',
    require: false,
  },
  longitude: {
    type: 'String',
    require: false,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
  addresstype: {
    ref: 'Addresstype',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAddress>('Address', AddressSchema);
