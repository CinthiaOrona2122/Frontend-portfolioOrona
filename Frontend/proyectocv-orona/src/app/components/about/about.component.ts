import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/services/about.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public aboutList: About[] = [];
  aboutForm: FormGroup;
  isUserLogged: Boolean = false;

  constructor(
    private aboutService: AboutService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
    ) {
    this.aboutForm = this.formBuilder.group({
      id: [''],
      text: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }

  private reloadData() {
    this.aboutService.getAll().subscribe(
      (data) => {
        this.aboutList = data;
      }
    ); 
  }

  private clearForm() {
    this.aboutForm.setValue({
      id: '',
      text: ''
    });
  }

  private loadForm(about: About) {
    this.aboutForm.setValue({
      id: about.id,
      text: about.text
    });
  }

  onSubmit(id: number) {
    let about: About = this.aboutForm.value;
    if (this.aboutForm.get('id')?.value == '') {
      this.aboutService.save(about).subscribe(
        (newAbout: About) => {
          this.aboutList.push(newAbout);
        }
      );
    } else {
      this.aboutService.update(id, about).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  public onNewAbout() {
    this.clearForm();
  }

  public onEditAbout(index: number) {
    let about: About = this.aboutList[index];
    this.loadForm(about);
  }

  public onDeleteAbout(index: number) {
    let about: About = this.aboutList[index];
    if (confirm("¿Estás seguro que deseas borrar el texto seleccionado?")) {
      this.aboutService.delete(about.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
}
