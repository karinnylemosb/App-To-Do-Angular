import { Component, DoCheck, OnInit } from '@angular/core';

// Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  // Transformar a string em Objeto (voltando pra a forma originak) ou || salvar como array vazio
  public taskList: Array <TaskList> = JSON.parse(localStorage.getItem ("list") || '[]');

  constructor() { }

  ngDoCheck(){

    this.setLocalStorate();
  }


public setEmitTaskList (event: string){
  this.taskList.push({task: event, checked:false})
}

  public deleteItemTaskList(event:number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você realmente deseja apagar tudo?");

    if(confirm) {
      this.taskList = [];
    }

  }

  public setLocalStorate(){

    if (this.taskList){
      //Botando os checados pra baixo:
      this.taskList.sort( (first, last) => Number (first.checked) - Number (last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
      //taskLink é array e o localStorage é String, por isso foi feito a conversão acima
    }
  }

}
