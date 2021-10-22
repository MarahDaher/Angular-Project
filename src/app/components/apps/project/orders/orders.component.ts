import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NewOrderComponent } from './new-order/new-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('tree', { static: true }) tree: NzTreeComponent;
  isVisible = false;
  confirmModal?: NzModalRef;

  nodes: any = [
    {
      key: 'Drinks',
      title: 'Drinks',
      link: "https://www.icecoffe.com",
      expanded: true,
      children: [
        { title: 'Ice Coffe', link: "https://www.icecoffe.com", isLeaf: true, key: 'Ice Coffe', parent_key: "Drinks" },
        { title: 'Ice Tea', link: "https://www.icecoffe.com", key: 'Ice Tea', isLeaf: true, parent_key: "Drinks" },
        { title: 'Milk', link: "https://www.icecoffe.com", key: 'Milk', isLeaf: true, parent_key: "Drinks" },
      ]
    },
    {
      title: 'Food',
      link: "https://www.icecoffe.com",
      key: 'Food',
      children: [
        { title: 'Sandwich', link: "https://www.icecoffe.com", key: 'Sandwich', isLeaf: true, parent_key: "Food" },
        { title: 'Chips', link: "https://www.icecoffe.com", key: 'Chips', isLeaf: true, parent_key: "Food" },
        { title: 'Moka', link: "https://www.icecoffe.com", key: 'Moka', isLeaf: true, parent_key: "Food" }
      ]
    }
  ];

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.nodes = JSON.parse(localStorage.getItem('nodesObject'))
  }

  showModal() {
    this.isVisible = true;
  }

  nzEvent(event: NzFormatEmitEvent) {
    if (event.dragNode.parentNode) {
      this.deleteNode(event.dragNode.origin)
      event.dragNode.origin.parent_key = event.dragNode.parentNode.key

    } else {
      this.deleteNode(event.dragNode.origin)
      event.dragNode.origin.parent_key = null
      event.dragNode.origin.isLeaf = false
      event.dragNode.origin.expanded = true
      this.nodes.push(event.dragNode.origin)
    }
    localStorage.setItem('nodesObject', JSON.stringify(this.nodes));
  }

  showConfirm(node): void {
    let selectedNode = node.origin;
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this order?',
      nzContent: '<b style="color: red;"> </b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteNode(selectedNode)
      },

      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  createCustomButtonModal(node?): void {
    const modal = this.modal.create({
      nzTitle: node ? 'Edit Order' : 'Add New Order',
      nzContent: NewOrderComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        items: this.nodes,
        selectedNode: node?.origin
      },
      nzOnOk: () => modal.getContentComponent(),
      nzOnCancel: () => modal.destroy()
    });

    modal.afterClose.subscribe(result => {
      console.log(result);
      if (result) {
        if (result.type == "origin") {
          result.key = result.title
          result.expanded = true
          delete result.parent_key;
          delete result.isLeaf;
          if (node) {
            this.deleteNode(node.origin)
            this.nodes.push(result)
          } else {
            this.nodes.push(result);
          }
        } else {
          result.key = result.title
          result.isLeaf = true
          this.nodes.forEach(items => {
            if (items.key == result.parent_key) {
              node ? Object.assign(node.origin, result) : items.children.push(result)
            }
          })
        }
        this.nodes = [...this.nodes];
        localStorage.setItem('nodesObject', JSON.stringify(this.nodes));

      }
    });
  }

  deleteNode(selectedNode) {
    if (!selectedNode.isLeaf) {
      this.nodes = this.nodes.filter(f => f.key != selectedNode.key)
    } else {
      this.nodes.forEach(items => {
        if (items.key == selectedNode.parent_key) {
          items.children = items.children.filter(f => f.key != selectedNode.key)
        }
      })
    }
    this.nodes = [...this.nodes];
    localStorage.setItem('nodesObject', JSON.stringify(this.nodes));
  }

}
