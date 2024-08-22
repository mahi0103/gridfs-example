import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction,Response,Request } from "express";

@Injectable()

export class Loggermiddleware implements NestMiddleware{
    constructor(private logger:Logger){}
    use(req: Request, res: Response, next: NextFunction) {
        const{method,originalUrl:url} = req;
        const requestTime = new Date().getTime();

        res.on('finish',()=>{
            const{statusCode} = res;
            const responseTime = new Date().getTime();
            if(statusCode === 201 || statusCode === 200){
                this.logger.log(
                    ` ${method} ${url} ${statusCode}:+${responseTime-requestTime}ms`

                )
            }
        })
        next();

        
    }

}