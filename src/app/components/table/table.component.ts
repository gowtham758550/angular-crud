import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'productName', 'brand' , 'actions'];

  editModalData: object = {
    title: "Edit Product",
    actionValue: "Update",
    actionButtonColor: "accent",
    snackBarMessage: "Product updated successfully",
    snackBarActionValue: "Ok",
    form: [
      {
        label: 'Product Name',
        formControlName: 'productName',
        placeholder: 'Enter product name',
        required: true,
        color: 'accent',
      },
      {
        label: 'Brand',
        formControlName: 'brand',
        placeholder: 'Enter Brand name',
        required: true,
        color: 'accent',
      },
    ],
  }

  deleteModalData: object = {
    title: "Do you really want to delete?",
    actionValue: "Delete",
    actionButtonColor: "warn",
    snackBarMessage: "Product deleted successfully",
    snackBarActionValue: "Ok",
    formGroup: {}
  }

  constructor(private dialog: MatDialog) {
    this.dataSource = new TableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editProduct(id: number): void {
    this.editModalData = {...this.editModalData, ...{formGroup: this.dataSource.data[id - 1]}}
    let editProduct = this.dialog.open(ModalComponent, { data: this.editModalData })
  }

  deleteProduct(id: number): void {
    let deleteModal = this.dialog.open(ModalComponent, { data: this.deleteModalData })
    deleteModal.afterClosed().subscribe(result => {
      if (result === "delete") {
        console.log(this.dataSource.data[id - 1])
      }
    })
  }
}
