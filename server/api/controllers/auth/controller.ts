import AuthService from '../../services/auth.service';
import { Request, Response } from 'express';

export class Controller {
  login(req: Request, res: Response): void {
    AuthService.login(req.body).then((r) => res.status(201).json(r));
  }

  signup(req: Request, res: Response): void {
    AuthService.signup(req.body).then((r) => res.status(201).json(r));
  }
}
export default new Controller();
