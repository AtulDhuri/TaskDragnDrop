import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTable } from '@angular/material/table';

interface DataRow {
  name: string;
  age: number;
  email: string;
  selected: boolean;
  [key: string]: string | number | boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('table') table!: MatTable<DataRow>;
  columns = ['name', 'age', 'email'];
  displayedColumns = [...this.columns, 'select'];  // Add 'select' for checkboxes
  droppedColumns: string[] = [];  // Store dropped columns for grouping
  groupedDataSource: DataRow[] = [];  // Store the grouped data source

  dataSource: DataRow[] = [
    { name: 'John Doe', age: 25, email: 'john@example.com', selected: false },
    { name: 'Jane Doe', age: 30, email: 'jane@example.com', selected: false },
    { name: 'Michael Smith', age: 35, email: 'michael@example.com', selected: false },
    { name: 'Linda Johnson', age: 28, email: 'linda@example.com', selected: false }
  ];

  onHeaderDrop(event: CdkDragDrop<string[]>) {
    // When a column is dropped into the header container
    const droppedColumn = event.item.data;
    if (!this.droppedColumns.includes(droppedColumn)) {
      this.droppedColumns.push(droppedColumn);  // Add column to the dropped columns
      this.groupDataByColumns();  // Re-group data based on dropped columns
    }
    this.table.renderRows();
  }

  removeColumn(column: string) {
    // When a column chip is removed from the header container
    const index = this.droppedColumns.indexOf(column);
    if (index >= 0) {
      this.droppedColumns.splice(index, 1);  // Remove column from dropped columns
      this.groupDataByColumns();  // Re-group data based on remaining dropped columns
    }
  }

  groupDataByColumns() {
    // Group the data based on the dropped columns
    if (this.droppedColumns.length > 0) {
      this.groupedDataSource = [...this.dataSource].sort((a, b) => {
        let result = 0;
        for (let col of this.droppedColumns) {
          if (result === 0) {
            result = a[col] > b[col] ? 1 : -1;
          }
        }
        return result;
      });
    } else {
      // If no columns are dropped, just show the original data
      this.groupedDataSource = [...this.dataSource];
    }
  }

  toggleSelectAll(event: MatCheckboxChange) {
    this.groupedDataSource.forEach(row => row.selected = event.checked);
  }

  isAllSelected(): boolean {
    return this.groupedDataSource.length > 0 && this.groupedDataSource.every(row => row.selected);
  }
}
