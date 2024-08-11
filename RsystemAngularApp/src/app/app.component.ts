import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseDto } from '../Interface/ResponseDto';
import { Stories } from '../Interface/Stories';
import { DataService } from '../data-service.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  public stories: Stories[] = [];
  private apiUrl = 'http://localhost:5237/api/Stories/GetIndex'; // Use relative path
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number =0;
  data: any[] | undefined;

  /////Add dependency for Http Client and DataService.
  constructor(private http: HttpClient, private dataService: DataService) { }
  private $stories = new Subject<Stories[]>();

  ngOnInit() {
    this.fetchData();
    this.$stories.subscribe(resp => {
      this.stories = resp;
    })    
  }
 
  /////Search Data base on TextArea Input.
  search(event: KeyboardEvent) {
    this.fetchData((event.target as HTMLTextAreaElement).value);
  }

  /////Fetch Data base on TextArea Input or Best 500 Stories.
  fetchData(searchText: string = ''): void {

    if (searchText === '' || searchText== null) {
      this.dataService.getPaginatedData(this.currentPage, this.pageSize)
        .subscribe(response => {
          // this.$stories.next(response.items as Stories[]);
          this.$stories.next(response.items);
          this.totalItems = this.pageSize * response.totalPages;
        });
    }
    else {
      this.dataService.getPaginatedData(this.currentPage, this.pageSize, searchText)
        .subscribe(response => {
          this.$stories.next(response.items);
          this.totalItems = this.pageSize * response.totalPages;
        });
    }
  }

  /////Trigger Fetch Data if page change happen.
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
    
  }
}
