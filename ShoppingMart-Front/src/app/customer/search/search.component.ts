import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  data: Product[];

  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    // const param = this.route.snapshot.paramMap.get('param');
    // if(param) {
    //   this.param = +param;
    // }

    this.data = history.state?.data;
    console.log(this.data);
  }
}
