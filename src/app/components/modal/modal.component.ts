import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface modalData {
  title: string,
  actionValue: string,
  actionButtonColor: string,
  form: [
    {
      label: string,
      formControlName: string,
      placeholder: string,
      required: boolean,
      color: string
    }
  ],
  formGroup: object,
  values: string,
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  modalForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:modalData,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group(
      this.data.formGroup
    )
  }

  addProduct() {
    // console.log(this.modalForm.value)
  }



}
