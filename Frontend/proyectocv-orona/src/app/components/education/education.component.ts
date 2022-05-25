import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public educationList: Education[];
  eduForm: FormGroup;
  isUserLogged: Boolean = false;

  message: '';

  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService

  ) {
    this.eduForm = this.formBuilder.group({
      id: [''],
      school_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      career: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      url_img: [''],
      edu_type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      score: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      dateStart: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dateEnd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      url: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.educationService.getAll().subscribe(
      (data) => {
        this.educationList = data;
      }
    );
  }

  private clearForm() {
    this.eduForm.setValue({
      id: '',
      school_name: '',
      title: '',
      career: '',
      url_img: '',
      edu_type: '',
      score: 0,
      dateStart: '',
      dateEnd: '',
      url: ''
    });
  }

  private loadForm(education: Education) {
    this.eduForm.setValue({
      id: education.id,
      school_name: education.school_name,
      title: education.title,
      career: education.career,
      url_img: education.url_img,
      edu_type: education.edu_type,
      score: education.score,
      dateStart: education.dateStart,
      dateEnd: education.dateEnd,
      url: education.url
    });
  }

  onSubmit(id: number) {
    let education: Education = this.eduForm.value;
    if (this.eduForm.get('id')?.value == '') {
      this.educationService.save(education).subscribe(
        (newEducation: Education) => {
          this.educationList.push(newEducation);
        }
      );
    } else {
      this.educationService.update(id, education).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  public onNewEducation() {
    this.clearForm();
  }

  public onEditEducation(index: number) {
    let education: Education = this.educationList[index];
    this.loadForm(education);
  }

  public onDeleteEducation(index: number) {
    let education: Education = this.educationList[index];
    if (confirm("¿Estás seguro que deseas borrar el item seleccionado?")) {
      this.educationService.delete(education.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}

