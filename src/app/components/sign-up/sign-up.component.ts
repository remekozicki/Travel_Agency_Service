import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { TripsService } from 'src/app/services/Trips.service';
import { AuthService } from 'src/app/services/Auth.service';
import { Trips } from 'src/models/model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'
  ]
})
export class SignUpComponent {

  signUpForm: FormGroup;
  constructor(
    private formBuldier: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tripService: TripsService
  ){}

  ngOnInit(): void {
    this.signUpForm = this.formBuldier.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userName: new FormControl('', Validators.required)
    })
    
  }

  createUser(){
    console.log(this.signUpForm.value)

    let email = this.signUpForm.get('email')!.value;
    let pass = this.signUpForm.get('password')!.value;
    let userName = this.signUpForm.get('userName')!.value
    this.authService.signUpEmailPass(email, pass, userName);
    this.signUpForm.reset();
    this.router.navigate(['homepage'])

  }

}