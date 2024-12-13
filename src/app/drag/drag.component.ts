import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDragStart } from '@angular/cdk/drag-drop';
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
      group1: [],
      group2: [],
    };
  
    groupedData: DataRow[] = [...this.dataSource];
  
    onColumnDrop(event: CdkDragDrop<string[]>, group: string) {
      const prevIndex = this.columnGroups[group].findIndex((column) => column === event.item.data);
      moveItemInArray(this.columnGroups[group], prevIndex, event.currentIndex);
      this.groupDataByDroppedColumn(event.item.data);
    }
  
    groupDataByDroppedColumn(column: string) {
      const grouped = this.dataSource.reduce((acc, row) => {
        const key = row[column as keyof DataRow];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(row);
        return acc;
      }, {} as Record<string, DataRow[]>);
      
      this.dataSource = Object.values(grouped).flat();

      this.dataSource.sort((a, b) => {
        if (typeof a[column as keyof DataRow] === 'string') {
          return (a[column as keyof DataRow] as string)
            .localeCompare(b[column as keyof DataRow] as string);
        }
        return (a[column as keyof DataRow] as number) - (b[column as keyof DataRow] as number);
      });

      this.groupedData = this.dataSource;
    }

    onRowDrop(event: CdkDragDrop<DataRow[]>) {
      console.log("onRowDrop");
      const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
      moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
      this.table.renderRows();
    }

    addColumnToGroup(columnName: string, group: string) {
      if(this.columnGroups['group1'].length == 0){
        this.columnGroups['group1'].push(columnName);
        return;
      } 
      if (!this.columnGroups['group1'].includes(columnName)) {
        this.columnGroups['group1'].push(columnName);
      }
    }

    removeItem(column:string){
      const index = this.columnGroups['group1'].indexOf(column);
      this.columnGroups['group1'].splice(index, 1);
      this.groupDataByDroppedColumn(column);
    }

    onDragStart(event: CdkDragStart) {
      this.addColumnToGroup(event.source.data, 'group1');
    }

    onHeaderDrop(event: CdkDragDrop<string[]>, groupId: string) {
      const column = event.item.data; 
      if (groupId === 'groupFirst') {
          this.addColumnToGroup(column, groupId);
      }
  }
}
