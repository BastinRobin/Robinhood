import mongoose, { Schema, Document } from 'mongoose';

export type IResidentdocument = Document;

const ResidentdocumentSchema: Schema = new Schema({
  document: {
    ref: 'Document',
    type: 'ObjectId',
  },
});

export default mongoose.model<IResidentdocument>(
  'Residentdocument',
  ResidentdocumentSchema
);
