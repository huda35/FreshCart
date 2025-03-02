import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
    {path:"auth",component:AuthLayoutComponent, children:[
        {path:"",canActivate:[loggedUserGuard], loadComponent:()=> import('./core/pages/register/register.component').then(c => c.RegisterComponent)},
        {path:"login", canActivate:[loggedUserGuard], loadComponent:()=> import('./core/pages/login/login.component').then(c => c.LoginComponent)},
        {path:"forget-password",canActivate:[loggedUserGuard], loadComponent:()=> import('./core/pages/forget/forget.component').then(c=>c.ForgetComponent)},
    ]},
    {path:"", loadComponent:()=> import('./core/pages/login/login.component').then(c => c.LoginComponent)},
    {path:"home", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/home/home.component').then(c => c.HomeComponent)},
    {path:"cart",canActivate:[authGuard] , loadComponent:()=> import('./features/pages/cart/cart.component').then(c => c.CartComponent)},
    {path:"wishlist",canActivate:[authGuard] , loadComponent:()=> import('./features/pages/wishlist/wishlist.component').then(c => c.WishlistComponent)},
    {path:"brands", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/brands/brands.component').then(c => c.BrandsComponent)},
    {path:"brandsdetails/:id", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/brandsdetails/brandsdetails.component').then(c => c.BrandsdetailsComponent)},
    {path:"products", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/products/products.component').then(c => c.ProductsComponent)},
    {path:"allorders", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/orders/orders.component').then(c => c.OrdersComponent)},
    {path:"categories", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent)},
    {path:"categorydetails/:id", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/categorydetails/categorydetails.component').then(c => c.CategorydetailsComponent)},
    {path:"productDetails/:id", canActivate:[authGuard] ,loadComponent:()=> import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent)},
    {path:"checkout/:cartId",canActivate:[authGuard] , loadComponent:()=> import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent)},
    {path:"**", loadComponent:()=> import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent)},

];

