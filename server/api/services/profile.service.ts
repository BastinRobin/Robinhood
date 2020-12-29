import { CreateQuery } from 'mongoose';
import * as crypto from 'crypto';

import Profile, { IProfile } from './../models/profile';
import { User } from './../models/user';
import Address, { IAddress } from './../models/address';
import Residentbranch, { IResidentbranch } from './../models/residentbranch';
import DB from '../../common/db/dynamo.db';
import L from '../../common/logger';
export class ProfileService {
  async findAll(): Promise<IProfile[]> {
    try {
      return await Profile.find().populate('profile_type');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async showByType(id: string): Promise<IProfile[]> {
    try {
      const profiles = await Profile.find({ profile_type: id }).populate(
        'profile_type'
      );
      for (const profile of profiles) {
        const address = await Address.find({ profile: profile._id });
        profile.address = address;
      }
      return profiles;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfile> {
    try {
      return await Profile.findById(id).populate('profile_type');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfile>): Promise<IProfile> {
    try {
      return await Profile.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async createResident(body: CreateQuery<any>): Promise<IProfile> {
    try {
      const user: User = body.user;
      const profile: IProfile = body.profile;
      const address: IAddress = body.address;
      const residentBranch: IResidentbranch = body.resident_branch;
      const encryptionKey = process.env.ENCRYPTION_KEY as string;
      const hash = crypto
        .createHmac('sha512', encryptionKey)
        .update(user.password);
      const hashedPass = hash.digest('hex').toString();
      const dbUserParams: any = {
        id: '' + new Date().getTime(),
        password: hashedPass,
        email: user.email,
        user_name: user.email,
        date_created: Date().toString(),
        enabled: 1,
      };

      // Create User
      const newUser: any = await DB.create('users', dbUserParams);
      if (newUser instanceof Error) {
        throw new Error('Error while creating user.');
      }

      // const dbUserTenantParams = {
      //   id: new Date().getTime(),
      //   user_id: +dbUserParams.id,
      //   tenant_id: tenant.id,
      //   date_created: Date().toString(),
      // };

      // Create user tenant
      // const userTenant = await DB.create('user_tenants', dbUserTenantParams);

      // if (userTenant instanceof Error) {
      //   await DB.delete('users', { user_name: dbUserParams.user_name });
      //   throw new Error('Error while creating user tenant.');
      // }

      // Create profile
      profile.user_id = dbUserParams.id;
      const newProfile = await Profile.create(profile);
      if (newProfile instanceof Error) {
        await DB.delete('users', { user_name: dbUserParams.user_name });
        throw new Error('Error while creating user profile.');
      }

      // Create address
      address.profile = newProfile._id;
      const newAddress = await Address.create(address);
      if (newAddress instanceof Error) {
        await DB.delete('users', { user_name: dbUserParams.user_name });
        await Profile.findByIdAndDelete(newProfile._id);
        throw new Error('Error while creating new address.');
      }

      // Create resident branch
      residentBranch.profile = newProfile._id;
      const newBranch = await Residentbranch.create(residentBranch);
      if (newBranch instanceof Error) {
        await DB.delete('users', { user_name: dbUserParams.user_name });
        await Profile.findByIdAndDelete(newProfile._id);
        await Address.findByIdAndDelete(newAddress._id);
        throw new Error('Error while creating resident branch.');
      }
      return newProfile;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async createCarer(body: CreateQuery<any>): Promise<IProfile> {
    try {
      const user: User = body.user;
      const profile: IProfile = body.profile;
      const address: IAddress = body.address;
      const encryptionKey = process.env.ENCRYPTION_KEY as string;
      const hash = crypto
        .createHmac('sha512', encryptionKey)
        .update(user.password);
      const hashedPass = hash.digest('hex').toString();
      const dbUserParams: any = {
        id: '' + new Date().getTime(),
        password: hashedPass,
        email: user.email,
        user_name: user.email,
        date_created: Date().toString(),
        enabled: 1,
      };

      // Create user
      const newUser: any = await DB.create('users', dbUserParams);
      if (newUser instanceof Error) {
        throw new Error('Error while creating user.');
      }

      // const dbUserTenantParams = {
      //   id: new Date().getTime(),
      //   user_id: +dbUserParams.id,
      //   tenant_id: tenant.id,
      //   date_created: Date().toString(),
      // };

      // Create user tenant
      // const userTenant = await DB.create('user_tenants', dbUserTenantParams);

      // if (userTenant instanceof Error) {
      //   await DB.delete('users', { user_name: dbUserParams.user_name });
      //   throw new Error('Error while creating user tenant.');
      // }

      // Create profile
      profile.user_id = dbUserParams.id;
      const newProfile = await Profile.create(profile);
      if (newProfile instanceof Error) {
        await DB.delete('users', { user_name: dbUserParams.user_name });
        throw new Error('Error while creating user profile.');
      }

      // Create address
      address.profile = newProfile._id;
      const newAddress = await Address.create(address);
      if (newAddress instanceof Error) {
        await DB.delete('users', { user_name: dbUserParams.user_name });
        await Profile.findByIdAndDelete(newProfile._id);
        throw new Error('Error while creating new address.');
      }
      return newProfile;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IProfile>, id: string): Promise<IProfile> {
    try {
      return;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfile> {
    try {
      return await Profile.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfileService();
