import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchKey:any = ""
  insideHome:boolean = true
allProducts:any = []

constructor(private api:ApiService,private toaster:ToastrService){}

ngOnInit(): void {
  this.api.getAllProductsAPI().subscribe((result:any)=>{
    this.allProducts = result
    console.log(this.allProducts);
    
  })
  this.api.searchKey.subscribe((result:any)=>{
    this.searchKey = result
  })
}

addToWishlist(product:any){
if(sessionStorage.getItem("token")){
// api call
this.api.addToWishlistAPI(product).subscribe({
  next:(result:any)=>{
    this.toaster.success(`Product ${result.title} Added to your wishlist`)
    this.api.getWishlistCount()

  },
  error:(reason:any)=>{
    this.toaster.warning(reason.error)
  }
})
}else{
  this.toaster.info("Please Login")
}
}

addToCart(product:any){
  // api call
  if(sessionStorage.getItem("token")){
    product.quantity = 1
  this.api.addToCartAPI(product).subscribe({
  next:(result:any)=>{
    this.toaster.success(result)
    this.api.getCartCount()
  },
  error:(reason:any)=>{
    this.toaster.warning(reason.error)
  }
})
  }else{
    this.toaster.info("Please Login")
  }
}


}
