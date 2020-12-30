import mongoose, { Schema, Document } from 'mongoose';

export interface IAccommodationdetails extends Document {
  owner_type: 'string';
  access_to_home: 'string';
  equipment_and_supplies: 'string';
  living_status: 'string';
  accommodation_info: 'string';
  accommodation_type: 'string';
  profile: 'string';
}

const AccommodationdetailsSchema: Schema = new Schema({
  owner_type: {
    type: 'String',
    require: true,
  },
  access_to_home: {
    type: 'String',
    require: false,
  },
  equipment_and_supplies: {
    type: 'String',
    require: false,
  },
  living_status: {
    type: 'String',
    require: false,
  },
  accommodation_info: {
    type: 'String',
    require: false,
  },
  accommodation_type: {
    type: 'String',
    require: false,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IAccommodationdetails>(
  'Accommodationdetails',
  AccommodationdetailsSchema
);
