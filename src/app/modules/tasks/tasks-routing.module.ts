import { Route, RouterModule } from "@angular/router";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { NgModule } from "@angular/core";

const routes: Route[] = [
    {
        path: '',
        component:TaskListComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}