import AuthService from './service';
import { Request, Response } from 'express';

export class Controller {
  login(req: Request, res: Response): void {
    AuthService.login(req.body).then((r) => res.status(201).json(r));
  }

  clientSignup(req: Request, res: Response): void {
    AuthService.clientSignup(req.body).then((r) => res.status(201).json(r));
  }

  carerSignup(req: Request, res: Response): void {
    AuthService.carerSignup(req.body).then((r) => res.status(201).json(r));
  }

  generateJWT(req: Request, res: Response): void {
    const userId = req.query.user_id as string;
    const email = req.query.email as string;
    AuthService.generateJWT(userId, email).then((r) => res.status(201).json(r));
  }
}
export default new Controller();
