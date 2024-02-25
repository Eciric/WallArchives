import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wall-create',
  templateUrl: './wall-create.component.html',
  styleUrls: ['./wall-create.component.css'],
})
export class WallCreateComponent implements OnInit {
  formGroup!: FormGroup;
  imageSrc!: string;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.email]),
      tags: new FormArray([], [Validators.required]),
      image: new FormControl(File, [Validators.required]),
    });
  }

  addTag(e: any): void {
    const tagValue = e.target.value;

    const tagsControl = this.formGroup.get('tags') as FormArray;

    tagsControl.push(new FormControl(tagValue));
    console.log(this.formGroup.get('tags'));
    e.target.value = '';
  }

  addImage(e: any): void {
    const file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var image = document.createElement('img');
        this.imageSrc = e.target.result;
        document.body.appendChild(image);
      };
      reader.readAsDataURL(file);
    }
  }
}
