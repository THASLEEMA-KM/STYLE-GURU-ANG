import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{

  product:any = {}
  

  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToastrService){}

ngOnInit(): void {
  this.route.params.subscribe((result:any)=>{
    const {id} = result
    console.log(id);
    this.getProductDetails(id)
    
  })
}

getProductDetails(pid:any){
  this.api.viewProductAPI(pid).subscribe((result:any)=>{
    this.product = result
    console.log(this.product);
    
  })
}

addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
  // api call
  this.api.addToWishlistAPI(product).subscribe({
    next:(result:any)=>{
      this.toaster.success(`Product ${result.title} Added to your wishlist`)
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
