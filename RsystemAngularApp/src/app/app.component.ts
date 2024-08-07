import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from '../Interface/ResponseDto';
import { Stories } from '../Interface/Stories';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public stories: Stories[] = [];
  private apiUrl = 'http://localhost:5237/api/Stories'; // Use relative path

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.http.get<ResponseDto>(this.apiUrl).subscribe(
      (responseData) => {

        this.stories = responseData.result as Stories[];
      },
      (error) => {
        console.error(error);
      }
    );
  }



}
