import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from './modules/auth/guards/token.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NoAuthGuard } from './modules/auth/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [TokenGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full'
          },
          {
            path: 'tasks',
            loadChildren: () =>
              import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    canActivate:[NoAuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
