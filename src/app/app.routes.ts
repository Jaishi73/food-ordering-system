import { Routes } from '@angular/router';

import { Landing } from './components/auth/landing/landing';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { UserHome } from './components/user/user-home/user-home';
import { ChefDashboard } from './components/chef/chef-dashboard/chef-dashboard';

import { AuthGuard } from './guards/authguards';
import { RoleGuard } from './guards/roleguard';
import { ChefDetail } from './chef-detail/chef-detail';
import { CheckoutComponent } from './checkout/checkout';

export const routes: Routes = [
  { path: '', component: Landing },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user-home',
    component: UserHome,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user'] }
  },
  {
    path: 'chef',
    component: ChefDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['chef'] }
  },

   { path: 'user-home',
     component: UserHome 
  },

  { path: 'chef/:id', 
   component: ChefDetail 
  },

{ path: 'checkout',
   component: CheckoutComponent
   },

  { path: '**', redirectTo: '' }
];