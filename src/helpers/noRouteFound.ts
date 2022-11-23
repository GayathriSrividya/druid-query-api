import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error("not found")
    } catch (error) {
        next(error);
    }
}
export { routeNotFound }




