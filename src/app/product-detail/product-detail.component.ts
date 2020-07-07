import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  constructor(private prodService: ProductService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.prodService.getProduct(id).subscribe(product => this.product = product);
  }
}
