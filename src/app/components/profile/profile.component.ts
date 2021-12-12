import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser : any
  currentUserCredentials : any
  credentials : any
  constructor(private firestore: Firestore,
    private _router:Router) {
    
   }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(''+localStorage.getItem('currentUser')) : ''
    let creds = collection(this.firestore, 'users_credentials');
    collectionData(creds).subscribe((data)=>{
      this.credentials=data
      this.credentials.map((item:any)=>{
        if(item['user_id']== this.currentUser['uid']){
          this.currentUserCredentials = item
        }
      })
      console.log({credentials:this.currentUserCredentials})
    });
  }

  logout(){
    localStorage.removeItem('currentUser')
    this._router.navigate(['/login']);
  }
}
