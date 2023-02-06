import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private service: ProductService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.readById(id).subscribe(p => {
      this.product = p;
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  delete(): void {
    this.service.delete(this.product.id.toString()).subscribe(() => {
      this.service.showMensage('Produto: ' 
      + this.product.id.toString() + ' - ' 
      + this.product.name + ' excluido com sucesso!');
      this.router.navigate(['/products'])
    })
  }

}
