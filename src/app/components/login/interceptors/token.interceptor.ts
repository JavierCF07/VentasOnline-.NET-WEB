import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this. authService.token;
        if(token != null){
            console.log(token);
            const authRequest = req.clone({headers: req.headers.set('Authorization',`Bearer ${token}`)});   
            return next.handle(authRequest);
        }
        return next.handle(req);
    }
}
