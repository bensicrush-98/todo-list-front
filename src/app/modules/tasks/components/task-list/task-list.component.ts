import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit{
  @Input() pendingTasks: Task[];
  @Input() inProgressTasks: Task[];
  @Input() completedTasks: Task[];

  ngOnInit(): void {
    console.log(this.pendingTasks);
  }


}
