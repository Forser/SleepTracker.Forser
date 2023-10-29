import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SleepTypeConst } from '../models/SleepTypeConst';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  public breakpoint!: number;
  myDate = new Date();
  wasFormChanged = false;

  keys: any[] = [];
  sleepTypes = SleepTypeConst;
  selectedSleepType = SleepTypeConst.Sleep;

  public createForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeOfSleep: new FormControl(''),
  });

  ngOnInit(): void {
    this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    console.log(this.keys);

    this.createForm = this.fb.group({
      IdProof: null,
      startDate: [''],
      endDate: [''],
      typeOfSleep: [''],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  onCreateForm() {
    this.markAsDirty(this.createForm);
  }

  openDialog() {
    console.log(this.wasFormChanged);
    // if (this.createForm.dirty) {
    //   const.dialogRef = this.dialog.open(DeleteComponent, {
    //     width: '340px'
    //   });
    // } else {
    this.dialog.closeAll();
    // }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup) {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
