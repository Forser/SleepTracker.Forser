import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { Sleep } from '../models/Sleep.model';
import { SleepService } from '../services/sleep.service';
import { SleepTypeConst } from '../models/SleepTypeConst';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private sleepService: SleepService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  public breakpoint!: number;
  typeOfSleep = 0;
  wasFormChanged = false;
  submitted = false;
  public color: ThemePalette = 'primary';

  keys: any[] = [];
  sleepTypes = SleepTypeConst;
  selectedSleepType = SleepTypeConst.Sleep;

  myDate = new Date();
  public dateControl = new FormControl(new Date());

  sleepRecord: Sleep = {
    startOfSleep: this.myDate.toISOString(),
    endOfSleep: this.myDate.toISOString(),
    typeOfSleep: 0,
  };

  public createForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    selectedSleepType: new FormControl(''),
  });

  ngOnInit(): void {
    this.keys = Object.entries(this.sleepTypes).map(([key, value]) => ({
      name: key,
      value: value,
    }));

    this.createForm = this.fb.group({
      IdProof: null,
      startDate: [''],
      endDate: [''],
      selectedSleepType: [''],
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

  onFormSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }

    const startForm = this.datepipe.transform(
      this.createForm.controls['startDate'].value,
      'yyyy-MM-ddTHH:mm:ssZ'
    )!;

    console.log(new Date(startForm).toISOString());
    console.log(this.createForm.controls['startDate'].value);
    // const data = {
    //   startOfSleep: this.datepipe
    //     .transform(
    //       this.createForm.controls['startDate'].value,
    //       'yyyy-MM-ddTHH:mm:ssZ'
    //     )
    //     ?.toString()!,
    //   endOfSleep: this.datepipe
    //     .transform(
    //       this.createForm.controls['endDate'].value,
    //       'yyyy-MM-ddTHH:mm:ssZ'
    //     )
    //     ?.toString()!,
    //   typeOfSleep: this.createForm.controls['selectedSleepType'].value,
    // };
    // console.log(data);
    return;
    // this.sleepService.addRecord(data).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.router.navigateByUrl('');
    //   },
    //   error: (e) => console.log(e),
    // });
  }

  formChanged() {
    this.wasFormChanged = true;
  }
}
