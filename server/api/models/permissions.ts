import mongoose, { Schema, Document } from 'mongoose';

export interface IPermissions extends Document {
  name: 'string';
  description: 'string';
  is_enabled: 'boolean';
}

const PermissionsSchema: Schema = new Schema({
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

export default mongoose.model<IPermissions>('Permissions', PermissionsSchema);
