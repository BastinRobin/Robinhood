import roleService from '../../services/role.service';
import { Request, Response } from 'express';
export class Controller {
  /**
   * List all records
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  index(req: Request, res: Response): void {
    roleService.findAll().then((r) => res.json(r));
  }

  /**
   * Fetch record using the diven :id
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  show(req: Request, res: Response): void {
    const id = req.params['id'];
    roleService.findById(id).then((r) => res.json(r));
  }

  /**
   * Create new record
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  store(req: Request, res: Response): void {
    const body = req.body;
    roleService.create(body).then((r) => res.json(r));
  }

  /**
   * Update record with :id
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  update(req: Request, res: Response): void {
    const body = req.body;
    const id = req.params['id'];
    roleService.update(body, id).then((r) => res.json(r));
  }

  /**
   * Delete record with :id
   *
   * @param   {Request}   req  [req description]
   * @param   {Response}  res  [res description]
   *
   * @return  {void}           [return description]
   */
  delete(req: Request, res: Response): void {
    const id = req.params['id'];
    roleService.deleteById(id).then((r) => res.json(r));
  }
}

export default new Controller();