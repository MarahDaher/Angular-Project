import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  OrderForm!: FormGroup;
  @Input() items;
  @Input() selectedNode;

  constructor(private fb: FormBuilder , private modal:NzModalRef) { }

  ngOnInit(): void {
    this.OrderForm = this.fb.group({
      children: [[]],
      title: ["", [Validators.required]],
      isLeaf: [false],
      expanded: [false],
      key: [],
      type: ["origin", [Validators.required]],
      link: ["", [Validators.required]],
      parent_key: ["", [Validators.required]],
    });
    console.log(this.selectedNode);
    
    if(this.selectedNode){
      this.selectedNode.type = this.selectedNode.isLeaf ? "child" : "origin";
      this.OrderForm.patchValue(this.selectedNode);
    }

  }

  

  handleCancel(){
    this.modal.destroy();
  }

  submitForm(form){
    // let tree = {};
    // tree = {
    //   title: form.order_name,
    //   key: form.order_name,
    //   children: [{
    //     title: form.type,
    //     link : form.order_link,
    //     isLeaf: true 
    //   }]
    // };
    this.modal.destroy(form);
  }

}
