import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

import { config as CONFIG } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  public mid!: number

  constructor(
    private http:HttpClient, 
    private cookieService: CookieService,
  ) {}

  getMovieDetails(movie_id:number): Observable<any> {
    return this.http.get(`${CONFIG.MOVIEDB_BASE}/movie/${movie_id}?api_key=${CONFIG.MOVIEDB_KEY}`)
  }
  
  postRating(movie_id:number, guest_session_id:string, body:{value: number}): Observable<any> {
      return this.http.post(`${CONFIG.MOVIEDB_BASE}/movie/${movie_id}/rating?api_key=${CONFIG.MOVIEDB_KEY}&guest_session_id=${guest_session_id}`, body)
  }

  getGuestSessionIdFromApi(): Observable<any> {
    return this.http.get(`${CONFIG.MOVIEDB_BASE}/authentication/guest_session/new?api_key=${CONFIG.MOVIEDB_KEY}`)
  }

  getGuestSessionIdFromCookie():string {
    return this.cookieService.get(CONFIG.GUEST_SESSIONID_COOKIE_NAME)
  }

  setGuestSessionIdCookie(cname:string, sid:string, exp:Date):void {
    this.cookieService.set(cname, sid, { expires: exp, path: '/' })
  }

}
