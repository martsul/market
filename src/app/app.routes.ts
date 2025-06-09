import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: HomePageComponent, title: 'Home' }],
  },
];
