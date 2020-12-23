import mongoose, { Schema, Document } from 'mongoose';

export interface ICareplandetails extends Document {
  self_manageable: 'boolean';
  manageable_with_support: 'boolean';
  fully_dependent: 'boolean';
  additional_details: 'string';
  any_concerns: 'string';
}

const CareplandetailsSchema: Schema = new Schema({
  self_manageable: {
    type: 'Boolean',
    require: true,
  },
  manageable_with_support: {
    type: 'Boolean',
    require: false,
  },
  fully_dependent: {
    type: 'Boolean',
    require: false,
  },
  additional_details: {
    type: 'String',
    require: false,
  },
  any_concerns: {
    type: 'String',
    require: false,
  },
  care_plan: {
    ref: 'Careplan',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICareplandetails>(
  'Careplandetails',
  CareplandetailsSchema
);
