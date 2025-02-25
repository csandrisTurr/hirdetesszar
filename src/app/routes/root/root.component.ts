import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../api.service';
import { categories } from '../../categories';
import { MatSelectModule } from '@angular/material/select';

interface Advertisement {
  id: string;
  user: { name: string, id: string };
  category: string;
  price: number;
  description: string;
  title: string;
  image: string;
  date: Date;
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  cuccok: Advertisement[] = [];
  userId: string = "";
  search: string = "";
  nagyoncuccok: WritableSignal<Advertisement[]> = signal([]);
  categories = ['', ...categories]
  category: string = ""

  constructor(private readonly apiService: ApiService) {}

  async ngOnInit() {
    const res = await this.apiService.get<Advertisement[]>('adv', {});
    const ass = await this.apiService.get<{ id: string }>('users/profile', {});
    this.userId = ass.data.id;

    this.cuccok = res.data;
    this.nagyoncuccok.update(value => this.cuccok);
  }

  async del(id: string) {
    const res = await this.apiService.delete<Advertisement[]>('adv/'+id, {});
    this.cuccok = this.cuccok.filter(x => x.id != id);
    await this.fos()
  }

  async fos() {
    return this.nagyoncuccok.update(value => this.cuccok.filter(x => (!this.category || x.category == this.category) && (!this.search || x.title.includes(this.search) || x.description.includes(this.search))))
  }
}
