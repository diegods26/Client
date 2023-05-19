import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { ShopParams } from '../models/shopParams';
import { Product } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('search') searchTerm!: ElementRef;

  shopParams = new ShopParams();
  products: Product[] = [];

  constructor(private shopService: ShopService, private router: Router) {}

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      //this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
    this.router.navigateByUrl('/shop');
  }

}
