import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user.interface';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )
  constructor(private readonly http: HttpClient,
    private readonly userAuthService: UserAuthService) { }

  public loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/authenticate`, user, {headers: this.requestHeader});
  }

  public roleMatch(allowedRoles) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles) 
    {
      for(let i=0; i< userRoles.length; i++)
      {
        for(let j = 0; j < allowedRoles.length; j++) 
        {
          if(userRoles === allowedRoles[j]) 
          {
            isMatch = true;
            
            return isMatch;
          } 
          else 
          {
            return isMatch;
          }
        }
      }
    }
    return isMatch;

  }
} 
