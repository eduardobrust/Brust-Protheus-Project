import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    console.log('login.service.ts ->');
  }
  private headers = {
    'X-Portinari-No-Count-Pending-Requests': 'false',
    'X-Portinari-Screen-Lock': 'true'
  };


  public isLogged() {
    let lret: boolean = true;

    if(sessionStorage.getItem('access_token') === null || sessionStorage.getItem('access_token') === ''){
      lret = false;
    }
    return lret;
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refreshtoken');
    sessionStorage.removeItem('expires_date');
  }

  login(username: string, password: string) {
    console.log('login.service.ts ->' + environment.baseUrl);
    return this.http.post<any>(
      `${environment.baseUrl}/api/oauth2/v1/token`,
      {},
      {
        headers: this.headers,
        params: {
          grant_type: 'password',
          password: password,
          username: username
        }
      }
    );
  }

  setNextDataRefreshToken(secondsExpire: number) {
    let dataatual = new Date()
    dataatual.setSeconds(dataatual.getSeconds() + secondsExpire - 60);
    sessionStorage.setItem('expires_date', dataatual.toString())
    return dataatual;
  }


  refresh(refresh_token: string) {
    return this.http.post<any>(`api/oauth2/v1/token`, {}, { headers: this.headers, params: { grant_type: 'refresh_token', refresh_token: refresh_token } })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // const allowedRoles = route.data.allowedRoles;

    if (!this.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['/home']);
    return true;
  }
}
