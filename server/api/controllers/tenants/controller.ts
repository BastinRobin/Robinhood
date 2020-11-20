import { Request, Response } from 'express';
import fetch from 'node-fetch';

import DynamoDB from '../../../common/db/dynamo.db';
import TenantService from '../../services/tenant.service';

export class Controller {
  async listAllTenants(req: Request, res: Response): Promise<void> {
    fetch('http://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((json) => res.json(json));
  }

  async createTenants(req: Request, res: Response): Promise<void> {
    TenantService.create(req.body).then((r) => res.status(201).json(r));
  }
}

export default new Controller();
