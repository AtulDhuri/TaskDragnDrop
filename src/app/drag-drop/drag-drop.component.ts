import { Component, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';

export interface PeriodicElement {
  srno: number;
  name: string;
  rollno: number;
  std: number;
  division: string;
}

const TABLE_DATA: PeriodicElement[] = [
  {
    "srno": 1,
    "name": "Alice Johnson",
    "rollno": 101,
    "std": 10,
    "division": "A"
  },
  {
    "srno": 2,
    "name": "Bob Smith",
    "rollno": 102,
    "std": 10,
    "division": "A"
  },
  {
    "srno": 3,
    "name": "Charlie Brown",
    "rollno": 103,
    "std": 10,
    "division": "B"
  },
  {
    "srno": 4,
    "name": "Diana Prince",
    "rollno": 104,
    "std": 10,
    "division": "B"
  },
  {
    "srno": 5,
    "name": "Ethan Hunt",
    "rollno": 105,
    "std": 10,
    "division": "A"
  },
  {
    "srno": 6,
    "name": "Fiona Gallagher",
    "rollno": 106,
    "std": 10,
    "division": "C"
  },
  {
    "srno": 7,
    "name": "George Clooney",
    "rollno": 107,
    "std": 10,
    "division": "C"
  },
  {
    "srno": 8,
    "name": "Hannah Montana",
    "rollno": 108,
    "std": 10,
    "division": "A"
  },
  {
    "srno": 9,
    "name": "Ian Malcolm",
    "rollno": 109,
    "std": 10,
    "division": "B"
  },
  {
    "srno": 10,
    "name": "Julia Roberts",
    "rollno": 110,
    "std": 10,
    "division": "C"
  }
];

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})



export class DragDropComponent {

  @ViewChild('table') table!: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['srno', 'name', 'rollno', 'std', 'division'];
  droppedColumns: string[] = ['D1', 'D2', 'D3', 'D4', 'D5'];;
  dataSource = TABLE_DATA;


  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    console.log(event, "DropTable");
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }
  dropHeader(event: CdkDragDrop<string[]>) {
    // Use transferArrayItem or moveItemInArray depending on your needs
    moveItemInArray(this.droppedColumns, event.previousIndex, event.currentIndex);
    this.updateGrouping();
  }

  removeColumn(column: string) {
    const index = this.droppedColumns.indexOf(column);
    if (index >= 0) {
      this.droppedColumns.splice(index, 1);
      this.updateGrouping();
    }
  }

    // Method to update the grouping of the table based on dropped columns
    updateGrouping() {
      // Implement your logic to group the dataSource based on droppedColumns
      // This could involve creating a new data structure or modifying the existing one
      console.log('Updated grouping based on:', this.droppedColumns);
    }

    selectAll(event:any){
      console.log(event);
    }






}
