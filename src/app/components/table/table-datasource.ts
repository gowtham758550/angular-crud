import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  productName: string;
  id: number;
  brand: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, productName: 'Hydrogen', brand: 'Xstream'},
  {id: 2, productName: 'Helium', brand: 'Xstream'},
  {id: 3, productName: 'Lithium', brand: 'Xstream'},
  {id: 4, productName: 'Beryllium', brand: 'Xstream'},
  {id: 5, productName: 'Boron', brand: 'Xstream'},
  {id: 6, productName: 'Carbon', brand: 'Xstream'},
  {id: 7, productName: 'Nitrogen', brand: 'Xstream'},
  {id: 8, productName: 'Oxygen', brand: 'Xstream'},
  {id: 9, productName: 'Fluorine', brand: 'Xstream'},
  {id: 10, productName: 'Neon', brand: 'Xstream'},
  {id: 11, productName: 'Sodium', brand: 'Xstream'},
  {id: 12, productName: 'Magnesium', brand: 'Xstream'},
  {id: 13, productName: 'Aluminum', brand: 'Xstream'},
  {id: 14, productName: 'Silicon', brand: 'Xstream'},
  {id: 15, productName: 'Phosphorus', brand: 'Xstream'},
  {id: 16, productName: 'Sulfur', brand: 'Xstream'},
  {id: 17, productName: 'Chlorine', brand: 'Xstream'},
  {id: 18, productName: 'Argon', brand: 'Xstream'},
  {id: 19, productName: 'Potassium', brand: 'Xstream'},
  {id: 20, productName: 'Calcium', brand: 'Xstream'},
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.productName, b.productName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
