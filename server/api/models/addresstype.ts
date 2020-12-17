import mongoose, { Schema, Document } from 'mongoose';
export interface IAddressType extends Document {
  name: string;
}

const AddressTypeSchema: Schema = new Schema({
  name: 'String',
});

export default mongoose.model<IAddressType>('AddressType', AddressTypeSchema);
