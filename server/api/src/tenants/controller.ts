import TenantService from './service';
import { Request, Response } from 'express';

export class Controller {
  create(req: Request, res: Response): void {
    TenantService.create(req.body).then((r) => res.status(201).json(r));
  }

  findAll(req: Request, res: Response): void {
    TenantService.findAll().then((r) => res.status(201).json(r));
  }

  find(req: Request, res: Response): void {
    const tenantName = req.params['tenant_name'];
    TenantService.find(tenantName).then((r) => res.status(201).json(r));
  }

  delete(req: Request, res: Response): void {
    const tenantName = req.params['tenant_name'];
    TenantService.delete(tenantName).then((r) => res.status(201).json(r));
  }
}
export default new Controller();
