import { Request, Response } from 'express';
import fetch from 'node-fetch';

import DynamoDB from '../../../common/db/dynamo.db';
import TenantService from '../../services/tenant.service';

export class Controller {
  /**
   * [listAllTenants description]
   *
   * @param   {Request}         req  [req description]
   * @param   {Response<void>}  res  [res description]
   *
   * @return  {Promise<void>}        [return description]
   */
  async listAllTenants(req: Request, res: Response): Promise<void> {
    const fetchPromise = fetch('https://jsonplaceholder.typicode.com/todos/');
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((people) => {
        res.json(people);
      });
  }

  /**
   * [getItem description]
   *
   * @param   {Request}         req  [req description]
   * @param   {Response<void>}  res  [res description]
   *
   * @return  {Promise<void>}        [return description]
   */
  async getItem(req: Request, res: Response): Promise<void> {
    const id = Number.parseInt(req.params['id']);
    const fetchPromise = fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((people) => {
        res.json(people);
      });
  }

  async createTenants(req: Request, res: Response): Promise<void> {
    TenantService.create(req.body).then((r) => res.status(201).json(r));
  }
}

export default new Controller();
