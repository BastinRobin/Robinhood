import { model, Schema, Model, Document, Types, Query } from 'mongoose';

  interface IAddressType extends Document {
    "name": "string"
}

  const AddressTypeSchema: Schema = new Schema(
    {
    "name": {
        "type": "String",
        "require": true
    }
}
  );
  
  const AddressType: Model<IAddressType> = model('AddressType', AddressTypeSchema);
  export default AddressType;