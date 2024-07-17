import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  allProducts:any = []
  cartTotalPrice:number = 0
  couponStatus:boolean = false
  couponClickedStatus:boolean = false
  constructor(private api:ApiService, private toaster:ToastrService,private router:Router){

  }

ngOnInit(): void {
  if(sessionStorage.getItem("token")){
    this.getCart()
  }
  

}

getCoupon(){
  this.couponStatus = true
}

backToOffers(){
  this.couponStatus = false
}

coupon5Percent(){
  this.couponClickedStatus = true
  let discount = Math.ceil(this.cartTotalPrice*.05)
  this.cartTotalPrice -= discount
}

coupon20Percent(){
  this.couponClickedStatus = true
  let discount = Math.ceil(this.cartTotalPrice*.2)
  this.cartTotalPrice -= discount
}

coupon50Percent(){
  this.couponClickedStatus = true
  let discount = Math.ceil(this.cartTotalPrice*.5)
  this.cartTotalPrice -= discount
}

checkOut(){
  sessionStorage.setItem("total",JSON.stringify(this.cartTotalPrice))
  this.router.navigateByUrl("/checkout")
}

getCart(){
  this.api.getCartAPI().subscribe((result:any)=>{
    this.allProducts = result
    this.getCartTotalPrice()
  })
  
    }

removeItem(id:any){
      this.api.removeCartAPI(id).subscribe((result:any)=>{
        this.getCart()
        // this.toaster.error("Item removed from your cart!!!")
        this.api.getCartCount()

      })
    }    
   incrementQuantity(id:any){
    this.api.incrementCartAPI(id).subscribe((result:any)=>{
      this.getCart()
    })
   } 

   decrementQuantity(id:any){
    this.api.decrementCartAPI(id).subscribe((result:any)=>{
      this.getCart()
      this.api.getCartCount()

    })
   } 

    emptyCart(){
      this.api.emptyCartAPI().subscribe((result:any)=>{
        this.getCart()
        this.api.getCartCount()
      })
    }

    getCartTotalPrice(){
      this.cartTotalPrice = Math.ceil(this.allProducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
    }
}
