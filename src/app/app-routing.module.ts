import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './common/about-us/about-us.component';
import { HomePageComponent } from './common/home-page/home-page.component';


const routes: Routes = [
  { path : "", component : HomePageComponent},
  { path : "aboutus", component : AboutUsComponent},
  { path: 'admin', loadChildren:
   () => import('./admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'user', loadChildren:
   () => import('./user/user.module').then(u => u.UserModule) },
   { path: 'hospitaluser', loadChildren:
   () => import('./hospitaluser/hospitaluser.module').then(h => h.HospitaluserModule), },
   { path: 'patient', loadChildren:
   () => import('./patient/patient.module').then(h => h.PatientModule) },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
