import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AddNewTripComponent } from './components/add-new-trip/add-new-trip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FiltersPipe } from './pipes/filters.pipe';
import { FilteringComponent } from './components/filtering/filtering.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

import { DatePipe } from '@angular/common';
import { ClientDashboardComponent } from './components/dashboards/client-dashboard/client-dashboard.component';
import { GuestDashboardComponent } from './components/dashboards/guest-dashboard/guest-dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './components/dashboards/manager-dashboard/manager-dashboard.component';
import { TestComponent } from './test/test.component';






@NgModule({
  declarations: [
    AppComponent,
    CardDisplayComponent,
    ShoppingCartComponent,
    AddNewTripComponent,
    StarRatingComponent,
    FiltersPipe,
    FilteringComponent,
    HomePageComponent,
    NavigationMenuComponent,
    SingleTripComponent,
    SignInComponent,
    SignUpComponent,
    MyProfileComponent,
    ClientDashboardComponent,
    GuestDashboardComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    TestComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],

 
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
