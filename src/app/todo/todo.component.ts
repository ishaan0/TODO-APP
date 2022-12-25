import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex: any;
  isEditEnable: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if(this.isEditEnable) return ;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTask(): void{
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  deleteTask(i: number): void{
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number): void{
    this.inprogress.splice(i, 1);
  }

  deleteDoneTask(i: number): void{
    this.done.splice(i, 1) ;
  }

  onEdit(item: ITask, i: number): void{
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnable = true;
  }

  updateTask(): void{
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.isEditEnable = false;
    this.updateIndex = undefined;
  }
}
