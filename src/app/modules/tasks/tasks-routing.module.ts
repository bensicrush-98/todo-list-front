import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TaskContainerComponent } from "./components/task-container/task-container.component";

const routes: Route[] = [
    {
        path: '',
        component:TaskContainerComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}