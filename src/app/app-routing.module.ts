import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTripComponent } from './components/add-new-trip/add-new-trip.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { AdminGuard } from './guard/admin.guard';
import { ClientGuard } from './guard/client.guard';
import { ManagerGuard } from './guard/manager.guard';
import { AuthGuard,} from './guard/Auth.guard';
import { TripsGuard } from './guard/trips.guard';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './components/dashboards/client-dashboard/client-dashboard.component';
import { ManagerDashboardComponent } from './components/dashboards/manager-dashboard/manager-dashboard.component';



const routes: Routes = [
  {path: '', component:HomePageComponent},
  {path: 'signIn',component: SignInComponent},
  {path: 'signUp',component: SignUpComponent},
  {path: 'homepage', component: HomePageComponent},
  {path: 'myPofile',component: MyProfileComponent, canActivate: [ClientGuard]},
  {path: 'dashboard',component: DashboardComponent, canActivate: [ClientGuard]},
  {path: 'clientDashboard',component: ClientDashboardComponent, canActivate: [ClientGuard]},
  {path: 'adminDashboard',component: AdminDashboardComponent, canActivate: [ClientGuard]},
  {path: 'menagerDashboard',component: ManagerDashboardComponent, canActivate: [ClientGuard]},
  {path: 'bannedDashboard',component: DashboardComponent,},
  {path: 'guestDashboard',component: DashboardComponent,},
  {path: 'tripsOffer', component: CardDisplayComponent},
  {path: 'newTripForm', component: AddNewTripComponent, canActivate: [ManagerGuard]},
  {path: 'singleTrip/:id',component: SingleTripComponent, canActivate: [ClientGuard] },
  {path: 'shopingCart',component: ShoppingCartComponent, canActivate: [ClientGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
