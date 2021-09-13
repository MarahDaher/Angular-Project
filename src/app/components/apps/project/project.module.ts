import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { ProjectRoutingModule } from './project-routing.module';
// import Components
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';

// import ngxDropzone
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [ProjectListComponent, CreateProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class ProjectModule { }
