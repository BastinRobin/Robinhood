- Users (AWS Dynamo DB)
  - id `int`
  - user_name `string`
  - password `string`
  - email `string`
  - created_at `datetime`

- User Tenant (AWS Dynamo DB)
  - id `int`
  - user_id `int`
  - tenant_id `int`

- Role (AWS Dynamo DB)
  - id `int`
  - name `string`
  - description `string`
  - is_enabled `boolean`

- User Role (AWS Dynamo DB)
  - id `int`
  - user_id `int`
  - role_id `int`

- Tenant (AWS Dynamo DB)
  - id `int`
  - tenant_name `string`
  - db_name `string`
  - db_user `string`
  - db_password `string`
  - db_port `string`
  - db_host `string`
  - organization `string`
  - config `string`
  - is_deleted `boolean`

- Profile
  - id `int`
  - user_id `string`
  - profile_type_id `string`
  - title `string`
  - first_name `string`
  - last_name `string`
  - nick_name `string`
  - image `string`
  - email `string`
  - mobile_no `string`
  - phone1 `string`
  - phone2 `string`
  - gender `string`
  - date_of_birth `string`
  - religion `string`
  - martial_status `string`
  - is_enabled `boolean`
  - is_deleted `boolean`

- Profile Type
  - id `int`
  - name `string`

- Next of Kin
  - id `int`
  - profile_id `int`
  - name `string`
  - relationship `string`
  - mobile_no `string`

- Address
  - id `int`
  - profile_id `int`
  - address_type_id `int`
  - country_id `int`
  - address1 `string`
  - address2 `string`
  - city `string`
  - postal_code `string`
  - latitude `string`
  - longitude `string`

- Address Type
  - id `int`
  - name `string`

- Country
  - id `int`
  - name `string`
  - is_enabled `boolean`

- Rating
  - id `int`
  - profile_id `int`
  - value `float`

- Branch
  - id `int`
  - name `string`
  - country_id `int`
  - longitude `string`
  - latitude `string`
  - postal_code `string`
  - town `string`
  - street `string`
  - is_enabled `boolean`

- Resident Branch
  - id `int`
  - branch_id `int`
  - profile_id `int`

- Employment Details
  - id `int`
  - profile_id `int`
  - employment_start_date `date`
  - employment_end_date: date `date`
  - dbs_number `string`
  - car_insurance `string`
  - monthly_working_hours `int`
  - star_location_latitude `float`
  - star_location_latitude `float`
  - travel_mod `string`
  - rate_per_hour `float`

- Appointment
  - id `int`
  - date `date`
  - start_time `time`
  - end_time: date `time`
  - break `int`
  - cancelled `boolean`
  - rescheduled `boolean`
  - confirmed `boolean`
  - published `boolean`
  - notes `string`

- Appointment Service
  - id `int`
  - service_id `int`
  - appointment_id `int`
  - status `boolean`
  - start_time `time`

- Appointed Carer
  - id `int`
  - profile_id `int`
  - appointment_id `int`

- Service
  - id `int`
  - name `string`
  - is_enabled `boolean`

- Availability
  - id `int`
  - profile_id `int`
  - date `date`
  - available `boolean`
  - unavailable `boolean`

- Resident Service Required
  - id `int`
  - service_id `int`
  - profile_id `int`

- Carer Service
  - id `int`
  - service_id `int`
  - profile_id `int`

- Permission
  - id `int`
  - name `string`
  - description `string`
  - is_enabled `boolean`

- Profile Permissions
  - id `int`
  - permission_id `int`
  - profile_id `int`

- Documents
  - id `int`
  - name `string`
  - description `string`
  - is_enabled `boolean`

- Profile Document
  - id `int`
  - document_id `int`
  - profile_id `int`
  - document_url `string`

- Carer Document
  - id `int`
  - document_id `int`

- Resident Document
  - id `int`
  - document_id `int`

- Carer Skill
  - id `int`
  - profile_id `int`
  - name `string`

- Carer Specialities
  - id `int`
  - profile_id `int`
  - name `string`

- Role
  - id `int`
  - name `string`
  - description `string`
  - is_enabled `boolean`

- Profile Role
  - id `int`
  - profile_id `int`
  - role_id `int`