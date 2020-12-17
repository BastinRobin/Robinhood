import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  title: 'string';
  first_name: 'string';
  last_name: 'string';
  image: 'string';
  nick_name: 'string';
  code: 'string';
  email: 'string';
  mobile_no: 'string';
  phone1: 'string';
  phone2: 'string';
  gender: 'string';
  date_of_birth: 'date';
  religion: 'string';
  martial_status: 'boolean';
  is_enabled: 'boolean';
  is_deleted: 'boolean';
}

const ProfileSchema: Schema = new Schema({
  title: {
    type: 'String',
    require: true,
  },
  first_name: {
    type: 'String',
    require: true,
  },
  last_name: {
    type: 'String',
    require: true,
  },
  image: {
    type: 'String',
    require: false,
  },
  nick_name: {
    type: 'String',
    require: false,
  },
  code: {
    type: 'String',
    require: false,
  },
  email: {
    type: 'String',
    require: true,
  },
  mobile_no: {
    type: 'String',
    require: true,
  },
  phone1: {
    type: 'String',
    require: false,
  },
  phone2: {
    type: 'String',
    require: false,
  },
  gender: {
    type: 'String',
    require: true,
  },
  date_of_birth: {
    type: 'Date',
    require: true,
  },
  religion: {
    type: 'String',
    require: false,
  },
  martial_status: {
    type: 'String',
    require: false,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
  is_deleted: {
    type: 'Boolean',
    require: true,
  },
  profile_type: {
    ref: 'ProfileType',
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);
