import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  chefId?: number;  // Track which chef
}

@Injectable({ providedIn: 'root'  })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable for components to subscribe
  cart$ = this.cartSubject.asObservable();

  getItems(): CartItem[] {
    return this.cartItems;
  }

  getCount(): number {
    return this.cartItems.length;
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
  }

  addItem(item: CartItem): void {
    // Check if item exists, increase quantity
    const existing = this.cartItems.find(cartItem => 
      cartItem.name === item.name && cartItem.chefId === item.chefId
    );
    
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    item.quantity = quantity;
    this.cartItems = this.cartItems.filter(i => i.quantity > 0);
    this.cartSubject.next(this.cartItems);
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.cartSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}