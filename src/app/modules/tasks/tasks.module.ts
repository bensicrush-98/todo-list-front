import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TaskComponent, TaskFormComponent, TaskListComponent, TaskContainerComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
})
export class TasksModule {}
