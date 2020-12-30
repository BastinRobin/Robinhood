import UploadService from '../../services/upload.service';
import { Request, Response } from 'express';
export class Controller {
  /**
   * Upload files
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  upload(req: Request, res: Response): void {
    UploadService.upload(req).then((r) => res.json(r));
  }
}

export default new Controller();
