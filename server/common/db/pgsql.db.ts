import { Connection } from 'typeorm';

export class DB {
  /**
   * [findAll to fetch all records from table]
   *
   * @param   {TableName}   TableName   [Name of the dynamo DB table]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  findAll = async (TableName: string): Promise<string[]> => {
    const repository = Connection.getRepository(User);
  };
}
export default new DB();
