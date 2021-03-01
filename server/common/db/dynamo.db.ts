import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const AWSDDB = new AWS.DynamoDB.DocumentClient();

export interface Query {
  TableName: string;
  KeyConditionExpression?: string;
  ExpressionAttributeNames?: any;
  ExpressionAttributeValues?: any;
  IndexName?: string;
  Key?: any;
}

export interface Find {
  TableName: string;
  Key: any;
}

export interface FindAll {
  TableName: string;
  Key?: any;
  ExclusiveStartKey?: any;
}
export class DB {
  /**
   * [findAll to fetch all records from table]
   *
   * @param   {TableName}   TableName   [Name of the dynamo DB table]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  findAll = async (TableName: string): Promise<string[]> => {
    const dbParams: FindAll = {
      TableName: TableName,
    };
    console.log('dbParams', dbParams);
    try {
      const scanResults = [];
      let items;
      do {
        items = await AWSDDB.scan(dbParams).promise();
        items.Items.forEach((item) => scanResults.push(item));
        dbParams.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != 'undefined');
      return scanResults;
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  /**
   * [find to fetch a records from table]
   *
   * @param   {TableName}   TableName   [Name of the dynamo DB table]
   * @param   {Key}      Key      [Key to fetch]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  find = async (TableName: string, Key: unknown): Promise<string[]> => {
    const dbParams: Find = {
      TableName: TableName,
      Key: Key,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await AWSDDB.get(dbParams).promise();
      return data.Item;
    } catch (err) {
      console.log('Failure', err.message);
    }
  };

  /**
   * [findBy to fetch records from table]
   *
   * @param   {TableName}   TableName   [Name of the dynamo DB table]
   * @param   {Key}      Key      [Key to fetch]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  findBy = async (
    TableName: string,
    KeyConditionExpression: string,
    ExpressionAttributeNames: any,
    ExpressionAttributeValues: any,
    IndexName?: string
  ): Promise<string[]> => {
    const dbParams = {
      TableName: TableName,
      IndexName: IndexName,
      KeyConditionExpression: KeyConditionExpression,
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await AWSDDB.query(dbParams).promise();
      return data.Items;
    } catch (err) {
      console.log('Failure', err.message);
    }
  };

  /**
   * [create to add new records in table]
   *
   * @param   {tableName}   tableName   [Name of the dynamo DB table]
   * @param   {params}      params      [Data to save]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  create = async (tableName: string, params): Promise<string[]> => {
    console.log('creating record', params);
    const dbParams = {
      TableName: tableName,
      Item: params,
    };
    try {
      await AWSDDB.put(dbParams).promise();
      return [params, true];
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  /**
   * [Update to add new records in table]
   *
   * @param   {tableName}   tableName   [Name of the dynamo DB table]
   * @param   {params}      params      [Data to save]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  update = async (tableName: string, Key: unknown, Item: any): Promise<any> => {
    try {
      let updateExpression = 'set';
      const ExpressionAttributeNames = {};
      const ExpressionAttributeValues = {};
      for (const property in Item) {
        updateExpression += ` #${property} = :${property} ,`;
        ExpressionAttributeNames['#' + property] = property;
        ExpressionAttributeValues[':' + property] = Item[property];
      }
      updateExpression = updateExpression.slice(0, -1);
      const params = {
        TableName: tableName,
        Key: Key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues,
      };
      const res = await AWSDDB.update(params).promise();
      return res;
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  /**
   * [delete to remove a records from table]
   *
   * @param   {TableName}   TableName   [Name of the dynamo DB table]
   * @param   {Key}      Key      [Key to delete]
   *
   * @return  {Promise<string[]>}        [return description]
   */
  delete = async (TableName: string, Key: unknown): Promise<string[]> => {
    const dbParams: Find = {
      TableName: TableName,
      Key: Key,
    };
    console.log('dbParams', dbParams);
    try {
      await AWSDDB.delete(dbParams).promise();
      return ['Deleted successfully'];
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };
}

export default new DB();
