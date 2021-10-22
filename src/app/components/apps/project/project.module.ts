import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { ProjectRoutingModule } from './project-routing.module';
// import Components
import { OrdersComponent } from './orders/orders.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';

// import ngxDropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NewOrderComponent } from './orders/new-order/new-order.component';


@NgModule({
  declarations: [OrdersComponent, CreateProjectComponent, NewOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
  providers: [ { provide: NZ_I18N, useValue: en_US } ]

})
export class ProjectModule { }
