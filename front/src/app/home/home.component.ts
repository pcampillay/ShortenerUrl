import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  getUrls: any;
  newUrl = '';
  urlForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getData();

    this.urlForm = this.formBuilder.group({
      url: [null, [Validators.required]],
    });
  }

  submit() {
    if (!this.urlForm.valid) {
      return;
    }
    console.log(this.urlForm.value);
    this.apiService.newShortener(this.urlForm.value).subscribe(data => {
      let dat: any = data;
      this.getData();
    });
  }

  async getData(){
    this.apiService.getDomain().subscribe(data => {
      this.filterDomains(data);
    });
  }

  async filterDomains(data: any) {
    const urlsDomain = data;
    let groupUrls: any = {};

    for (const iterator of urlsDomain.domains) {
      if( !groupUrls.hasOwnProperty(iterator.domain)){
        groupUrls[iterator.domain] = {
          domain: iterator.domain,
          urls: []
        }
      }
      groupUrls[iterator.domain].urls.push(iterator);
    }
    let arrayGroupUrls: any = [];

    for (let clave in groupUrls){
      arrayGroupUrls.push(groupUrls[clave]);
    }
    this.getUrls = arrayGroupUrls;
  }

}
