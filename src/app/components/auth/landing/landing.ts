import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

type Category = 'all' | 'biryani' | 'burger' | 'pizza' | 'thali' | 'momos' | 'rolls' | 'dalkhichdi' | 'chole' | 'dal-rice' | 'mattarpanner' | 'sabji' | 'starter';

interface CategoryItem {
  key: Category;
  label: string;
  image: string;
}

interface Meal {
  name: string;
  desc: string;
  price: number;
  time: number;
  rating: number;
  category: Category;
  image: string;
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
  selector: 'app-landing',
    standalone: true,
  imports: [RouterLink,CommonModule, FormsModule,RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

searchText = '';
  activeCategory: Category = 'all';
  selectedChef: Chef | null = null;


  categories: CategoryItem[] = [
    { key: 'chole' as Category, label: 'chole', image: '/assets/images/chole-bhature.png' },
    { key: 'dal-rice' as Category, label: 'dal-rice', image: '/assets/images/dal-rice.png' },
    { key: 'mattarpanner' as Category, label: 'mattarpanner', image: '/assets/images/mattarpanner-cart.png' },
    { key: 'dalkhichdi' as Category, label: 'dalkhichdi', image: '/assets/images/dalkhichdi-cart.png' },
    { key: 'sabji' as Category, label: 'sabji', image: '/assets/images/sabji.png' },
    { key: 'starter' as Category, label: 'starter', image: '/assets/images/starter-food.png' },
    { key: 'thali' as Category, label: 'thali', image: '/assets/images/thali.png' },
    { key: 'dalkhichdi' as Category, label: 'dalkhichdi', image: '/assets/images/dalkhichdi-cart.png' },
   
  ];

  meals: Meal[] = [
    {
      name: 'Chole Bhature',
      desc: 'Spicy Punjabi chole served with fluffy bhature.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'chole',
      image: '/assets/images/chole-bhature.png'
    },
     {
    name: 'Amritsari Chole',
    desc: 'Authentic Amritsari-style chole with rich spices.',
    price: 150,
    time: 22,
    rating: 4.7,
    category: 'chole',
    image: '/assets/images/AmritsariChole.jpg'
  },
  {
    name: 'Chole Kulche',
    desc: 'Tangy chole served with soft kulche.',
    price: 130,
    time: 18,
    rating: 4.5,
    category: 'chole',
    image: '/assets/images/chole-kulche.jpg'
  },
  {
    name: 'Punjabi Chole Rice',
    desc: 'Spiced chickpea curry served with rice.',
    price: 125,
    time: 20,
    rating: 4.4,
    category: 'chole',
    image: '/assets/images/Panjabi-Chole.jpg'
  },
    {
      name: 'Rajma Chawal',
      desc: 'Slow-cooked rajma with steamed basmati rice.',
      price: 15.99,
      time: 25,
      rating: 4.8,
      category: 'dal-rice',
      image: '/assets/images/Rajma_Chawal.png'
    },
    {
    name: 'Dal Tadka Rice',
    desc: 'Yellow dal tempered with ghee & spices.',
    price: 110,
    time: 20,
    rating: 4.4,
    category: 'dal-rice',
    image: '/assets/images/dal-rice.png'
  },
  {
    name: 'Dal Fry Rice',
    desc: 'Medium-spiced dal fry with rice.',
    price: 115,
    time: 21,
    rating: 4.3,
    category: 'dal-rice',
    image: '/assets/images/dal-tadka.jpg'
  },
  {
    name: 'Jeera Rice with Dal',
    desc: 'Fragrant jeera rice paired with plain dal.',
    price: 105,
    time: 18,
    rating: 4.2,
    category: 'dal-rice',
    image: '/assets/images/Jeera-Rice.jpg'
  },

    {
      name: 'Matar Paneer',
      desc: 'Soft paneer cubes in rich tomato gravy.',
      price: 12.99,
      time: 19,
      rating: 4.6,
      category: 'mattarpanner',
      image: '/assets/images/mattarpanner-cart.png'
    },
    {
    name: 'Paneer Butter Masala',
    desc: 'Creamy paneer curry with buttery flavour.',
    price: 170,
    time: 26,
    rating: 4.8,
    category: 'mattarpanner',
    image: '/assets/images/Paneer-Butter-Masala.jpg'
  },
  {
    name: 'Shahi Paneer',
    desc: 'Royal paneer dish cooked in cashew gravy.',
    price: 175,
    time: 28,
    rating: 4.6,
    category: 'mattarpanner',
    image: '/assets/images/Shahi-Paneer.jpg'
  },
  {
    name: 'Paneer Masala',
    desc: 'Spicy onion-tomato based paneer curry.',
    price: 165,
    time: 24,
    rating: 4.5,
    category: 'mattarpanner',
    image: '/assets/images/Paneer-Masala.jpg'
  },

     {
      name: 'Dal Khichdi',
      desc: 'Comforting moong dal khichdi with ghee.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'dalkhichdi',
      image: '/assets/images/dalkhichdi-cart.png'
    },
     {
    name: 'Vegetable Khichdi',
    desc: 'Healthy khichdi loaded with vegetables.',
    price: 115,
    time: 20,
    rating: 4.3,
    category: 'dalkhichdi',
    image: '/assets/images/veg-khichdi.jpg'
  },
  {
    name: 'Masala Khichdi',
    desc: 'Spicy version of classic dal khichdi.',
    price: 120,
    time: 22,
    rating: 4.5,
    category: 'dalkhichdi',
    image: '/assets/images/Masala-Khichid.jpg'
  },
  {
      name: 'Aloo Gobi',
      desc: 'Classic dry sabji with potato and cauliflower.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'sabji',
      image: '/assets/images/sabji.png'
    },
    {
    name: 'Bhindi Masala',
    desc: 'Crispy bhindi cooked with onion spices.',
    price: 105,
    time: 17,
    rating: 4.3,
    category: 'sabji',
    image: '/assets/images/bhindi-masala.jpg'
  },
  {
    name: 'Mix Veg',
    desc: 'Seasonal vegetables cooked in gravy.',
    price: 110,
    time: 18,
    rating: 4.4,
    category: 'sabji',
    image: '/assets/images/vegetable-curry.jpg'
  },
  {
    name: 'Cabbage Sabji',
    desc: 'Lightly spiced cabbage stir fry.',
    price: 95,
    time: 14,
    rating: 4.1,
    category: 'sabji',
    image: '/assets/images/sabji.png'
  },

     {
      name: 'Paneer Pakoda',
      desc: 'Crispy fried paneer fritters.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'starter',
      image: '/assets/images/paneer-pakoda.jpg'
    }, 
    {
    name: 'Veg Cutlet',
    desc: 'Golden fried vegetable patties.',
    price: 80,
    time: 10,
    rating: 4.3,
    category: 'starter',
    image: '/assets/images/starter-food.png'
  },
  {
    name: 'Hara Bhara Kabab',
    desc: 'Spinach & pea based healthy kababs.',
    price: 95,
    time: 14,
    rating: 4.4,
    category: 'starter',
    image: '/assets/images/starter-food.png'
  },
  {
    name: 'French Fries',
    desc: 'Crispy salted potato fries.',
    price: 70,
    time: 8,
    rating: 4.2,
    category: 'starter',
    image: '/assets/images/starter-food.png'
  },
  {
      name: 'North Indian Thali',
      desc: 'Dal, sabji, roti, rice, salad & dessert.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'thali',
      image: '/assets/images/north-indian.jpg'
    },
  {
    name: 'Veg Maharaja Thali',
    desc: 'Premium thali with multiple curries.',
    price: 260,
    time: 35,
    rating: 4.7,
    category: 'thali',
    image: '/assets/images/thali.png'
  },
  {
     name: 'Vegetable Thali',
    desc: 'Balanced veg thali with seasonal curries.',
      price: 12.99,
      time: 18,
      rating: 4.8,
      category: 'thali',
      image: '/assets/images/thali.png'
    },
     {
    name: 'Simple Veg Thali',
    desc: 'Daily meal thali with homestyle taste.',
    price: 180,
    time: 25,
    rating: 4.4,
    category: 'thali',
    image: '/assets/images/thali.png'
  },
  {
    name: 'Special Lunch Thali',
    desc: 'Chef’s special rotating lunch thali.',
    price: 240,
    time: 32,
    rating: 4.6,
    category: 'thali',
    image: '/assets/images/thali.png'
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
    },
    {
      id: 4,
      name: 'Chef Sara',
      experience: 8,
      rating: 5.0,
      speciality: 'Continental',
      image: '/assets/images/chefimage.jpg'
    },
    {
      id: 5,
      name: 'Chef Sara',
      experience: 8,
      rating: 5.0,
      speciality: 'Continental',
      image: '/assets/images/chefimage.jpg'
    },
    {
      id: 6,
      name: 'Chef Sara',
      experience: 8,
      rating: 5.0,
      speciality: 'Continental',
      image: '/assets/images/chefimage.jpg'
    },
    {
      id: 7,
      name: 'Chef Sara',
      experience: 8,
      rating: 5.0,
      speciality: 'Continental',
      image: '/assets/images/chefimage.jpg'
    }
  ];
  authService: any;
  router: any;
  
  get filteredMeals(): Meal[] {
    const text = this.searchText.toLowerCase();

    return this.meals.filter(m => {
      const catMatch = this.activeCategory === 'all' || m.category === this.activeCategory;
      const textMatch = text ? m.name.toLowerCase().includes(text) : true;
      return catMatch && textMatch;
    });
  }

  setCategory(cat: Category): void {
    this.activeCategory = cat;
  }

  selectedCategory: string | null = null;

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
  get filteredTodaysMeals(): Meal[] {
    if(!this.selectedCategory)return this.meals;
    return this.meals.filter(m => m.category === this.selectedCategory);
  }

// REPLACE your existing addToCart method with this:
addToCart(meal: Meal): void {
  // ALWAYS show popup regardless of login status
  const userChoice = confirm(
    '🔐 LOGIN REQUIRED!\n\n' +
    'Please login or signup to add items to cart.\n\n' +
    'Click OK to continue...'
  );
  
  if (userChoice) {
    this.router.navigate(['/login']);
  }

}
}
