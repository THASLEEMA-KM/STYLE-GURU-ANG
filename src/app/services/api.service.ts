import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")
  
serverURL = 'https://style-guru-server-ang.onrender.com'
  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllProductsAPI(){
    return this.http.get(`${this.serverURL}/allProducts`)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.serverURL}/${id}/view`)
  }
  registerAPI(user:any){
    return this.http.post(`${this.serverURL}/register`,user)
  }
  loginAPI(user:any){
    return this.http.post(`${this.serverURL}/login`,user)
  }

  // to append token to http

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(product:any){
    return this.http.post(`${this.serverURL}/addToWishlist`,product,this.appendToken())
  }

  getWishlistAPI(){
    return this.http.get(`${this.serverURL}/getWishlist`,this.appendToken())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((result:any)=>{
      this.wishlistCount.next(result.length)
    })
  }

  removeWishlistAPI(id:any){
    return this.http.delete(`${this.serverURL}/wishlist/${id}/remove`,this.appendToken())
  }

addToCartAPI(product:any){
  return this.http.post(`${this.serverURL}/addToCart`,product,this.appendToken())

}
getCartAPI(){
  return this.http.get(`${this.serverURL}/getCart`,this.appendToken())
}

getCartCount(){
  this.getCartAPI().subscribe((result:any)=>{
    this.cartCount.next(result.length)
  })
}

removeCartAPI(id:any){
  return this.http.delete(`${this.serverURL}/cart/${id}/remove`,this.appendToken())
}

incrementCartAPI(id:any){
  return this.http.get(`${this.serverURL}/cart/${id}/increment`,this.appendToken())

}
decrementCartAPI(id:any){
  return this.http.get(`${this.serverURL}/cart/${id}/decrement`,this.appendToken())

}
emptyCartAPI(){
  return this.http.delete(`${this.serverURL}/emptyCart`,this.appendToken())

}

}
