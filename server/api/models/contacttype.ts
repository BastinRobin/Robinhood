import mongoose, { Schema, Document } from 'mongoose';

export interface IContacttype extends Document {
  name: 'string';
  page_type: 'string';
}

const ContacttypeSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  page_type: {
    type: 'String',
    require: true,
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IContacttype>('Contacttype', ContacttypeSchema);
