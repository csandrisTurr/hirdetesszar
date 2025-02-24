import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

  click() {}
}
