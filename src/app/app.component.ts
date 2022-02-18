import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  addModalData:object = {
    title: "Add Product",
    actionValue: "Add",
    actionButtonColor: "primary",
    form: [
      {
        label: 'Product Name',
        formControlName: 'productName',
        placeholder: 'Enter product name',
        required: true,
        color: 'primary'
      },
      {
        label: 'Brand',
        formControlName: 'brand',
        placeholder: 'Enter Brand name',
        required: true,
        color: 'primary'
      },
    ],
    formGroup: {
      productName: '',
      brand: ''
    },
    get string():object {
      console.log()
      return {}
    }
  }

  constructor(public dialog: MatDialog) {}

  addModal():void {
    let addModal = this.dialog.open(ModalComponent, {data: this.addModalData})
    // addModal.afterClosed().subscribe(result => {
    //   console.log(result)
    // })
  }
}
