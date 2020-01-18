import { Component, OnInit } from "@angular/core"
import {IProduct} from './product'
import { ProductService } from './product.service';
@Component({
    selector:'pm-product',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle:string = "Product List"
    imageWidth:number = 50;
    imageMargin:number = 2;
    showImage:boolean = false;
    errorMessage:string
    _listfilter:string;
    get listFilter():string{
      return this._listfilter
    }
    set listFilter(value:string){
      this._listfilter = value
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products
    }
   

    filteredProducts:IProduct[]
    products:IProduct[]

    constructor(private productService:ProductService ){
    }
    onRatingClicked(message:string):string{
      return this.pageTitle += message
    }
    performFilter(filterBy:string):IProduct[]{
      filterBy = filterBy.toLocaleLowerCase()
      return this.products.filter((product : IProduct) => 
                    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }
    toggleImage():void{
      this.showImage = !this.showImage
    }
    ngOnInit():void{
    this.productService.getProduct().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products
      },
      error:   err => this.errorMessage = err
      
    })
    }
}