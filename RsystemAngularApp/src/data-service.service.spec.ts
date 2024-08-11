import {
   HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data-service.service';
import { Stories } from './Interface/Stories';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe("Dataservice", () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {


    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule], 
      providers: [DataService]
    });
    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  //////Demo Data to be used for testing.
  var demoData = [
    {
      "id": 41171060,
      "title": "Moments in Chromecast's history",
      "url": "https://blog.google/products/google-nest/chromecast-history/",
      "type": "story"
    },
    {
      "id": 41171142,
      "title": "VisiCalc – The Early Days (2003)",
      "url": "https://benlo.com/visicalc/",
      "type": "story"
    }
  ];


 
  /////Check Whether Data Service Giving Data by Using Mock Data 
  it("should give all Data", () => { 

    dataService.getPaginatedData(1, 1).subscribe((Responsedata: Stories[]) => {
      expect(Responsedata).toBeTruthy()
      expect(Responsedata.length).toBe(2)
    })


    // Expect an HTTP GET request to the apiUrl
    const req = httpTestingController.expectOne('http://localhost:5237/api/Stories/GetIndex' + `?pageIndex=${1}&pageSize=${1}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request).toBeTruthy()


    // Respond with mock data
    req.flush(demoData);
  })

})
