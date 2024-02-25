import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Wall } from 'src/app/interfaces/wall';
import { UserService } from 'src/app/services/user/user.service';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-wall-create',
  templateUrl: './wall-create.component.html',
  styleUrls: ['./wall-create.component.css'],
})
export class WallCreateComponent implements OnInit {
  formGroup!: FormGroup;
  imageSrc!: string;

  constructor(
    private wallService: WallService,
    private userService: UserService
  ) {}

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
    e.target.value = '';
  }

  addImage(e: any): void {
    const file = e.target.files[0];
    this.formGroup.get('image')?.setValue(file);
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

  onSubmit(): void {
    this.wallService
      .addWall(
        {
          title: this.formGroup.get('title')?.value,
          tags: this.formGroup.get('tags')?.value,
        } as Wall,
        this.formGroup.get('image')?.value,
        this.userService.getUserInfo()?.uid || ''
      )
      .subscribe({
        next: (createdWall: Wall) => {
          console.log('Created Wall: ', createdWall);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
