import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskComponent, TaskFormComponent, TaskListComponent],
  imports: [CommonModule, TasksRoutingModule],
})
export class TasksModule {}
