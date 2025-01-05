import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  pendingReq:boolean = false;
  apiUrl:string = 'https://api.pexels.com/v1/search?query=';
  constructor(private httpClient:HttpClient){

  }

  getItems(page:number,perPage:number,query:string){
    if(this.pendingReq){
      return {} as Observable<{}>;
    }
    this.pendingReq = true;
    const url = `${this.apiUrl}${query}&per_page=${perPage}&page=${page}`;
    this.pendingReq = false;
    return this.httpClient.get<any>(url).pipe(delay(3000));
  }
}
