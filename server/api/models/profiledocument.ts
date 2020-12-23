import mongoose, { Schema, Document } from 'mongoose';

export interface IProfiledocument extends Document {
  document_url: 'string';
}

const ProfiledocumentSchema: Schema = new Schema({
  document_url: {
    type: 'String',
    require: true,
  },
  document: {
    ref: 'Document',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IProfiledocument>(
  'Profiledocument',
  ProfiledocumentSchema
);
