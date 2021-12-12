import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "login",
    component: SigninComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "",
    redirectTo: "profile",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
