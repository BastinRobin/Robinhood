import mongoose, { Schema, Document } from 'mongoose';

export interface IEmploymentdetails extends Document {
  start_date: 'date';
  end_date: 'date';
  dbs_number: 'string';
  car_insurance: 'string';
  tax_number: 'string';
  monthly_working_hours: 'number';
  location_latitude: 'string';
  location_longitude: 'string';
  address: 'string';
  travel_mod: 'string';
  rate_per_hour: 'number';
  profile: 'string';
}

const EmploymentdetailsSchema: Schema = new Schema({
  start_date: {
    type: 'Date',
    require: true,
  },
  end_date: {
    type: 'Date',
    require: false,
  },
  dbs_number: {
    type: 'String',
    require: true,
  },
  car_insurance: {
    type: 'String',
    require: false,
  },
  tax_number: {
    type: 'String',
    require: true,
  },
  monthly_working_hours: {
    type: 'Number',
    require: true,
  },
  location_latitude: {
    type: 'String',
    require: true,
  },
  location_longitude: {
    type: 'String',
    require: true,
  },
  address: {
    type: 'String',
    require: true,
  },
  travel_mod: {
    type: 'String',
    require: true,
  },
  rate_per_hour: {
    type: 'Number',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IEmploymentdetails>(
  'Employmentdetails',
  EmploymentdetailsSchema
);
