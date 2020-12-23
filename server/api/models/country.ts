import mongoose, { Schema, Document } from 'mongoose';

export interface ICountry extends Document {
  name: 'string';
  is_enabled: 'boolean';
}

const CountrySchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
});

export default mongoose.model<ICountry>('Country', CountrySchema);
