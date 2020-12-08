import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectID,
  ObjectIdColumn,
  BaseEntity,
} from 'typeorm';
@Entity()
export class Profile extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  user_id: number;

  @Column()
  profile_type_id: number;

  @Column()
  title: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  nick_name: string;

  @Column()
  code: string;

  @Column()
  image: string;

  @Column()
  email: string;

  @Column()
  mobile_no: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  gender: string;

  @Column()
  date_of_birth: string;

  @Column()
  religion: string;

  @Column()
  martial_status: string;

  @Column()
  is_enabled: boolean;

  @Column()
  is_deleted: boolean;
}

export default Profile;
