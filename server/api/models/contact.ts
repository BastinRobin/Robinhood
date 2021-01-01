import mongoose, { Schema, Document } from 'mongoose';

  export interface IContact extends Document {
    "page_type": "string",
    "type": "string",
    "category": "string",
    "access_type": "string",
    "comments": "string"
}

  const ContactSchema: Schema = new Schema(
    {
    "page_type": {
        "type": "String",
        "require": true
    },
    "type": {
        "type": "String",
        "require": true
    },
    "category": {
        "type": "String",
        "require": true
    },
    "access_type": {
        "type": "String",
        "require": false
    },
    "comments": {
        "type": "String",
        "require": false
    },
    "contact_type": {
        "ref": "Contacttype",
        "type": "ObjectId"
    },
    "profile": {
        "ref": "Profile",
        "type": "ObjectId"
    }
}
  );
  
  export default mongoose.model<IContact>('Contact', ContactSchema);