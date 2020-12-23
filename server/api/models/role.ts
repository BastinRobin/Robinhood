import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: 'string';
  description: 'string';
  is_enabled: 'boolean';
}

const RoleSchema: Schema = new Schema({
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

export default mongoose.model<IRole>('Role', RoleSchema);
