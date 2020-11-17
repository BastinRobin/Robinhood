import { Request, Response } from 'express';
import fetch from 'node-fetch';

export class Controller {
  async listAllTenants(req: Request, res: Response): Promise<void> {
    fetch('http://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((json) => res.json(json));
  }
}

export default new Controller();
