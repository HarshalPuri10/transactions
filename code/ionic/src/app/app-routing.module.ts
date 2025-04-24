import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { IonicModule } from '@ionic/angular'; // Ensure Ionic module is included

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./components/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), // Ensure modules are preloaded
    IonicModule.forRoot(), // Initialize Ionic routing system
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
