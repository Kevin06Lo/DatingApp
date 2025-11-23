import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal} from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient); //This inject method is used instead of contructor
  protected title = 'Dating App';
  protected members = signal<any>([]);

  async ngOnInit() { //Since we implemented an interface OnInit we need to implement this method
    this.members.set(await this.getMembers())
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get("https://localhost:5001/api/members"));
    }catch (error){
      console.log(error);
      throw error;
    }
  }
}
