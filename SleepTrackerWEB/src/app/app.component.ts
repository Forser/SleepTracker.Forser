import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SleepService } from './services/sleep.service';
import { ISleep } from './models/ISleep.model';
import { SleepTypeEnum } from './models/SleepTypeEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SleepTrackerWEB';
  displayedColumns = [
    'id',
    'startOfSleep',
    'endOfSleep',
    'typeOfSleep',
    'lengthOfSleep',
    'Actions',
  ];
  dataSource = new MatTableDataSource<ISleep>();
  sleepRecords: ISleep[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  SleepTypeEnum = SleepTypeEnum;
  sleepEnum: SleepTypeEnum = SleepTypeEnum.Sleep;

  constructor(public sleepService: SleepService, private router: Router) {}

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.sleepService.getRecordsWithoutFilters().subscribe((res) => {
      this.dataSource.data = res;
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteRecord(id: number) {
    this.sleepService.deleteRecord(id).subscribe(() => {
      this.fetchData();
    });
    console.log('Record deleted successfully');
  }
}
