import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService, CartItem } from '../service/cartservice';

interface Address {
  street: string;
  city: string;
  pincode: string;
  phone: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount = 0;
  deliveryCharge = 50;
  grandTotal = 0;
  
  address: Address = {
    street: '',
    city: '',
    pincode: '',
    phone: ''
  };

  paymentMethod = 'cash'; // 'cash', 'card', 'upi'
  orderPlaced = false;
  estimatedDelivery = '';

  paymentOptions = [
    { id: 'cash', label: 'Cash on Delivery', icon: '💰' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', label: 'UPI', icon: '📱' }
  ];

  constructor(
    private router: Router,
    private location: Location,
     private cartService: CartService 
  ) {}

  ngOnInit(): void {
    // Simulate cart data (later from CartService)
   this.cartItems = this.cartService.getItems();  // ← REAL CART DATA
  this.calculateTotals();
  }



  calculateTotals(): void {
this.totalAmount = this.cartService.getTotal();  // ← SERVICE TOTAL
  this.grandTotal = this.totalAmount + this.deliveryCharge;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.calculateTotals();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotals();
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.calculateTotals();
  }

  placeOrder(): void {
    if (this.address.street && this.address.phone) {
      this.orderPlaced = true;
      this.estimatedDelivery = '25-35 minutes';
      
      // Simulate payment processing
      setTimeout(() => {
        alert(`Order placed successfully! 🍽️\nDelivery in ${this.estimatedDelivery}`);
        this.goBack();
      }, 1500);
    } else {
      alert('Please fill address and phone number');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
