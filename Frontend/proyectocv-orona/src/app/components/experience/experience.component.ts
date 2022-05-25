import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public experienceList: Experience[];
  expForm: FormGroup;
  isUserLogged: Boolean = false;

  constructor(
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService

  ) {
    this.expForm = this.formBuilder.group({
      id: [''],
      job_position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      company_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      url_img: [''],
      job_type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      dateStart: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dateEnd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      url: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })
  }

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }

  private reloadData() {
    this.experienceService.getAll().subscribe(
      (data) => {
        this.experienceList = data;
      }
    );
  }

  private clearForm() {
    this.expForm.setValue({
      id: '',
      job_position: '',
      company_name: '',
      url_img: '',
      job_type: '',
      dateStart: '',
      dateEnd: '',
      url: ''
    });
  }

  private loadForm(experience: Experience) {
    this.expForm.setValue({
      id: experience.id,
      job_position: experience.job_position,
      company_name: experience.company_name,
      url_img: experience.url_img,
      job_type: experience.job_type,
      dateStart: experience.dateStart,
      dateEnd: experience.dateEnd,
      url: experience.url
    });
  }

  onSubmit(id: number) {
    let experience: Experience = this.expForm.value;
    if (this.expForm.get('id')?.value == '') {
      this.experienceService.save(experience).subscribe(
        (newExperience: Experience) => {
          this.experienceList.push(newExperience);
        }
      );
    } else {
      this.experienceService.update(id, experience).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewExperience() {
    this.clearForm();
  }

  onEditExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    this.loadForm(experience);
  }

  onDeleteExperience(index: number) {
    let experience: Experience = this.experienceList[index];
    if (confirm("¿Estás seguro que deseas borrar el item seleccionado?")) {
      this.experienceService.delete(experience.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


}


