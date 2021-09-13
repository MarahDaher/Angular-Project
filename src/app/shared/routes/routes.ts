import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'project',
    loadChildren: () => import('../../components/apps/project/project.module').then(m => m.ProjectModule)
  },
];
