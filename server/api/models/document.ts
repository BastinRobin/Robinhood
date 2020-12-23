import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  name: 'string';
  description: 'string';
  is_enabled: 'boolean';
}

const DocumentSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  description: {
    type: 'String',
    require: false,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
});

export default mongoose.model<IDocument>('Document', DocumentSchema);
