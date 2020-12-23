import mongoose, { Schema, Document } from 'mongoose';

export interface IAddresstype extends Document {
  name: 'string';
}

const AddresstypeSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
});

export default mongoose.model<IAddresstype>('Addresstype', AddresstypeSchema);
