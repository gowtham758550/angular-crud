import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface modalData {
  title: string,
  actionValue: string,
  actionButtonColor: string,
  snackBarMessage: string,
  snackBarActionValue: string,
  form: [
    {
      inputType: string,
      label: string,
      options: any,
      formControlName: string,
      placeholder: string,
      required: boolean,
      color: string
    }
  ],
  formGroup: {productName: string, brand: string},
  values: string,
}

export interface updateModalFormGroup {
  productName: any,
  brand: any
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  modalForm!: FormGroup
  snackBarDuration: number = 1

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:modalData,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    if (this.data.actionValue === 'Update') {
      let formGroup: updateModalFormGroup = {productName: [], brand: []}
      formGroup.productName = [this.data.formGroup.productName, Validators.required]
      formGroup.brand = [this.data.formGroup.brand, Validators.required]
      this.modalForm = this.formBuilder.group(
        formGroup
      )
    } else{
      this.modalForm = this.formBuilder.group(
        this.data.formGroup
      )
    }
  }

  action(snackBarMessage: string, snackBarActionValue: string): void {
    this.matSnackBar.open(snackBarMessage, snackBarActionValue, {duration: this.snackBarDuration * 1000})
  }



}
