import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config as CONFIG } from '../../utils/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  constructor(private http:HttpClient) {}
  
  getMovies(query:string, page:number): Observable<any> {
    return this.http.get(`${CONFIG.MOVIEDB_BASE}/search/movie?api_key=${CONFIG.MOVIEDB_KEY}&page=${page}&include_adult=false&query=${query}`)
  }
}
