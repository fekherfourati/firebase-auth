import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  type = ''
  public loginForm:any= FormGroup;
  public isLoading = false;
  public submitted = false;

  constructor(firestore: AngularFirestore,private _auth:AuthService, private _formBuilder:FormBuilder, private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(){
    return this.loginForm.controls
  }

  signIn(){
    this.submitted=true
    if(this.loginForm.invalid){
      return;
    }
    this._auth.login({
      email:this.loginForm.controls.email.value,
      password:this.loginForm.controls.password.value
    })
    .then((res:any)=>{
      console.log({res})
      localStorage.setItem('currentUser',JSON.stringify(res['user']['_delegate']))
      this._router.navigate(['/profile']);
    })
    .catch((err)=>{
      console.log(err)
      this.loginForm.reset()
    })
  }

}
