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
        inputType: 'input',
        label: 'Product Name',
        formControlName: 'productName',
        placeholder: 'Enter product name',
        required: true,
        color: 'primary'
      },
      {
        inputType: 'autoComplete',
        label: 'Brand',
        options: ['ASUS', 'LG', 'Samsung', 'RealMe', 'Oppo'],
        formControlName: 'brand',
        placeholder: 'Enter Brand name',
        required: true,
        color: 'primary'
      },
      {
        inputType: 'select',
        label: 'Color',
        options: ['Black', 'White', 'Green', 'Red', 'Blue'],
        formControlName: 'color',
        required: true,
        color: 'primary'
      }
    ],
    formGroup: {
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required]
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
