import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  getUrls : any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getDomain().subscribe(data => {
      this.getUrls = data;
    });
  }

}
