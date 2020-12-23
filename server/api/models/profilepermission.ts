import mongoose, { Schema, Document } from 'mongoose';

export type IProfilepermission = Document;

const ProfilepermissionSchema: Schema = new Schema({
  permission: {
    ref: 'Permissions',
    type: 'ObjectId',
  },
  profile: {
    ref: 'Profile',
    type: 'ObjectId',
  },
});

export default mongoose.model<IProfilepermission>(
  'Profilepermission',
  ProfilepermissionSchema
);
