import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CartItem, CartService } from '../service/cartservice';


interface Meal {
  name: string;
  desc: string;
  price: number;
  time: number;
  rating: number;
  image: string;
    quantity?: number;
}

interface Chef {
  id: number;
  name: string;
  experience: number;
  rating: number;
  speciality: string;
  image: string;
}

@Component({
  selector: 'app-chef-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chef-detail.html',
  styleUrl: './chef-detail.css',
})
export class ChefDetail implements OnInit{
chefId: number = 0;
  chef!: Chef;
  searchText = '';
  cartCount = 0;
  cartItems: Meal[] = [];

  // Chef-specific meals (expand this later)
  meals: Meal[] = [
    {
      name: 'Chef Ananya Special Paneer Tikka',
      desc: 'Smoky marinated paneer with green chutney.',
      price: 14.99,
      time: 22,
      rating: 4.9,
      image: '/assets/images/chole-bhature.png'
    },
    {
      name: 'Dal Makhani by Ananya',
      desc: 'Slow-cooked creamy black lentils.',
      price: 11.99,
      time: 28,
      rating: 4.8,
      image: '/assets/images/chole-bhature.png'
    },
    {
      name: 'Butter Naan Trio',
      desc: 'Garlic, plain, and butter naan combo.',
      price: 8.99,
      time: 15,
      rating: 4.7,
      image: '/assets/images/chole-bhature.png'
    }
  ];

  chefs: Chef[] = [
    {
      id: 1,
      name: 'Chef Ananya',
      experience: 6,
      rating: 4.9,
      speciality: 'North Indian',
      image: '/assets/images/chefimage.jpg'
    },
    {
      id: 2,
      name: 'Chef Rahul',
      experience: 4,
      rating: 4.7,
      speciality: 'South Indian',
      image: '/assets/images/chefimage.jpg'
    },
    {
      id: 3,
      name: 'Chef Sara',
      experience: 8,
      rating: 5.0,
      speciality: 'Continental',
      image: '/assets/images/chefimage.jpg'
    }
  ];

  ngOnInit(): void {
    // Get chef ID from URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chefId = id;
    this.chef = this.chefs.find(c => c.id === id)!;
  this.cartCount = this.cartService.getCount();
  }

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) {}



   addToCart(meal: Meal): void {
   

    const cartItem: CartItem = {
      name: meal.name,
      price: meal.price,
      quantity: 1,
      image: meal.image || 'https://via.placeholder.com/300x200?text=Food',
      chefId: this.chefId
    };

    console.log('Adding cartItem:', cartItem);  // ← STEP 2: Check conversion
    
    this.cartService.addItem(cartItem);
    this.cartCount = this.cartService.getCount();
    
    console.log('Cart count now:', this.cartCount);  // ← STEP 3: Check result
  }

   goBack(): void {
    this.router.navigate(['/user-home']);     // go back to home
   
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
getTotal(): number {
  return this.cartService.getTotal();  // Use service total
}
  get filteredMeals(): Meal[] {
    const text = this.searchText.toLowerCase();
    return this.meals.filter(m =>
      m.name.toLowerCase().includes(text)
    );
  }

  updateCartCount(): void {
    // Sync with global cart if you have a service later
    this.cartCount = this.cartItems.length;
  }

  goToCheckout(): void {
    // Later: navigate to checkout
    // console.log('Go to checkout with', this.cartItems);
    this.router.navigate(['/checkout']);
  }
}
