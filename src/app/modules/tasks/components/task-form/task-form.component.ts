import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { finalize } from 'rxjs';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { futureDateValidator } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  _loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._initializeForm();
  }

  _initializeForm(): void {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', [Validators.required, futureDateValidator()]],
    });
  }

  _onSubmit(): void {
    this._loading = true;
    if (this.taskForm.valid) {
      const { title, description, dueDate } = this.taskForm.value;
      const formattedDate = moment(dueDate).format('YYYY-MM-DDTHH:mm:ss');
      this._taskService
        .createTask(title, description, formattedDate)
        .subscribe({
          next: () => this._handleTaskCreationSuccess(),
          error: () => this._handleTaskCreateError(),
          complete: () => this._handleTaskCreationComplete(),
        });
    }
  }

  _handleTaskCreationSuccess(): void {
    this._toastrService.success('Task created successfully!');
  }

  _handleTaskCreateError(): void {
    this._toastrService.error('Error while creating the task, try again later');
  }

  _handleTaskCreationComplete(): void {
    this._loading = false;
    this.taskForm.reset();
    this.dialogRef.close();
  }

}
