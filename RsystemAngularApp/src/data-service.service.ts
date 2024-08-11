import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ResponseDto } from "./Interface/ResponseDto";

@Injectable({
  providedIn: 'root'
})


export class DataService {
  private apiUrl = 'http://localhost:5237/api/Stories/GetIndex'; // Use relative path  Get

  /////Add Dependency For Http Client 
  constructor(private http: HttpClient) { }

  /////Fetch Data Based User Search text or 500 Stories 
  getPaginatedData(page: number, pageSize: number, searchText: string = ''): Observable<any> {
    if (searchText === '' || searchText == null) {
      this.apiUrl = 'http://localhost:5237/api/Stories/GetIndex';
      return this.http.get<ResponseDto>(this.apiUrl + `?pageIndex=${page}&pageSize=${pageSize}`);
    } else {
      this.apiUrl = 'http://localhost:5237/api/Stories/Get';
      return this.http.get<ResponseDto>(this.apiUrl + `?pageIndex=${page}&pageSize=${pageSize}&query=${searchText}`);

    }
  }


  
}
