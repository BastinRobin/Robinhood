import mongoose, { Schema, Document } from 'mongoose';

export type ICarerdocument = Document;

const CarerdocumentSchema: Schema = new Schema({
  document: {
    ref: 'Document',
    type: 'ObjectId',
  },
});

export default mongoose.model<ICarerdocument>(
  'Carerdocument',
  CarerdocumentSchema
);
