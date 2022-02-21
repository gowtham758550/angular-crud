import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { ModalComponent } from './components/modal/modal.component';
import { Validators } from '@angular/forms';

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
    snackBarMessage: "Product added successfully",
    snackBarActionValue: "Ok",
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
      productName: ['', Validators.required],
      brand: ['', Validators.required]
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
