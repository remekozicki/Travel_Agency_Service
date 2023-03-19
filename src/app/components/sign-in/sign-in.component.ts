import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'
  ]
})
export class SignInComponent {

  signedUser:any;

  signInForm: FormGroup;
  constructor(
    private formBuldier: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.signInForm = this.formBuldier.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,])
    })
    
  }

  signInUser(){
    console.log(this.signInForm.value)

    let email = this.signInForm.get('email')!.value;
    let pass = this.signInForm.get('password')!.value;
    this.authService.signInEmailPass(email, pass);
    this.signInForm.reset();

    this.router.navigate(['homepage'])
  }

}
