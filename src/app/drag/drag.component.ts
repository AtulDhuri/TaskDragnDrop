import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

interface ColumnGroups {
  [key: string]: string[];
}

interface DataRow {
  name: string;
  age: number;
  position: string;
  country: string;
}

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent {

  @ViewChild('table') table!: MatTable<DataRow>;
    dataSource: DataRow[] = [
      { name: 'John', age: 25, position: 'Developer', country: 'USA' },
      { name: 'Jane', age: 30, position: 'Designer', country: 'Canada' },
      { name: 'Sarah', age: 40, position: 'HR', country: 'Australia' },
      { name: 'Sam', age: 22, position: 'Intern', country: 'Germany' },
      { name: 'Derek', age: 50, position: 'CEO', country: 'USA' },
      
      { name: 'Jake', age: 35, position: 'Manager', country: 'UK' },
    ];
  
    displayedColumns: string[] = ['name', 'age', 'position', 'country'];
    
    columnGroups: ColumnGroups = {
      group1: ['name', 'age'],
      group2: ['position', 'country'],
    };
  
    groupedData: DataRow[] = [...this.dataSource];
  
    onColumnDrop(event: CdkDragDrop<string[]>, group: string) {
      console.log(event.item.data, group)
      const prevIndex = this.columnGroups[group].findIndex((column) => column === event.item.data);
      moveItemInArray(this.columnGroups[group], prevIndex, event.currentIndex);
      this.groupDataByDroppedColumn(event.item.data);
    }
  
    groupDataByDroppedColumn(column: string) {
      console.log("Grouping data by column:", column);
      console.log("Original dataSource:", this.dataSource); // Log original data

      // Group the data based on the dropped column
      const grouped = this.dataSource.reduce((acc, row) => {
        const key = row[column as keyof DataRow];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(row);
        return acc;
      }, {} as Record<string, DataRow[]>);
      
      console.log("Grouped data:", grouped); // Log grouped data

      // Flatten the grouped data back into an array
      this.dataSource = Object.values(grouped).flat();

      // Sort the data based on the dropped column
      this.dataSource.sort((a, b) => {
        if (typeof a[column as keyof DataRow] === 'string') {
          return (a[column as keyof DataRow] as string)
            .localeCompare(b[column as keyof DataRow] as string);
        }
        return (a[column as keyof DataRow] as number) - (b[column as keyof DataRow] as number);
      });

      console.log("Grouped and sorted data:", this.dataSource); // Log final data
      this.groupedData = this.dataSource
    }

    onRowDrop(event: CdkDragDrop<DataRow[]>) {
      const prevIndex = this.dataSource.findIndex(d => d === event.item.data);
      moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      this.table.renderRows();
    }
}
