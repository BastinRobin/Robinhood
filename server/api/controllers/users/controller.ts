import UserService from '../../services/user.service';
import { Request, Response } from 'express';

export class Controller {
  create(req: Request, res: Response): void {
    UserService.create(req.body).then((r) => res.status(201).json(r));
  }

  findAll(req: Request, res: Response): void {
    UserService.findAll().then((r) => res.status(201).json(r));
  }

  find(req: Request, res: Response): void {
    const userName = req.params['user_name'];
    UserService.find(userName).then((r) => res.status(201).json(r));
  }

  delete(req: Request, res: Response): void {
    const userName = req.params['user_name'];
    UserService.delete(userName).then((r) => res.status(201).json(r));
  }
}
export default new Controller();
