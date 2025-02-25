import { Component, ɵgetUnknownElementStrictMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../api.service';
import { categories } from '../../categories';
import { Router } from '@angular/router';
import { DelayService } from '../../delay.service';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  files: FileList | null = null;

  title: string = ""
  description: string = ""
  price: string = ""
  categories = categories
  category: string = categories[0]

  constructor(private readonly apiService: ApiService, private readonly router: Router, private readonly delayService: DelayService) {}

  changeHandler(ev: any) {
    console.log("help")
    const input: any = document.getElementById('fileupload');
    let list = new DataTransfer();
    list.items.add(input.files[0]);
    this.files = list.files;
  }

  dropHandler(ev: any) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    let counter = 0;
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (counter == 1) return;

        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          const input: any = document.getElementById('fileupload');
          let list = new DataTransfer();
          list.items.add(file);
          this.files = list.files;

          input.files = list.files;
          console.log(`… file[${i}].name = ${file.name}`);
        }

        counter++;
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  dragOverHandler(ev: any) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  async click() {
    this.delayService.do(async () => {
      let filename: string | undefined;
      const cat = this.category;

      if (this.files != null && this.files?.length > 0)
        filename = (await this.apiService.uploadFile(this.files![0])).data.file.filename;

      const ass = await this.apiService.get<{ id: string }>('users/profile', {});

      this.apiService.post('adv', {
        userId: ass.data.id,
        category: cat,
        price: parseInt(this.price),
        description: this.description,
        title: this.title,
        image: filename,
      });

      this.router.navigateByUrl('/');
    }, 1000);
  }
}
