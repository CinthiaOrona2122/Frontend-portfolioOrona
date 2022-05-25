import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { PersonaService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']

})
export class PersonComponent implements OnInit {
  public personList: Person[];
  personForm: FormGroup;
  loginForm: FormGroup;
  loginError: boolean = false;
  isUserLogged: Boolean = false;


  //Import experience and education.
  companyName: string;
  expPosition: string;
  expImage: string;
  schoolName: string;
  eduImage: string;

  constructor(
    private personaService: PersonaService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
    

  ) {
    this.personForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      cuit: ['', [Validators.required, Validators.maxLength(11)]],
      url_img: ['', [Validators.required, Validators.maxLength(150)]],
      interest: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      birthday: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    }),
      this.experienceService.currentCompany_name.subscribe(data => {
        this.companyName = data;
      }),
      this.experienceService.currentPosition.subscribe(data => {
        this.expPosition = data;
      }),
      this.experienceService.currentImage.subscribe(data => {
        this.expImage = data;
      }),
      this.educationService.currentSchool_name.subscribe(data => {
        this.schoolName = data;
      }),
      this.educationService.currentImage.subscribe(data => {
        this.eduImage = data;
      });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(9), Validators.pattern('[a-zA-Z/@]*')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z/@]*')]]
    });

  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }

  private reloadData() {
    this.personaService.getAll().subscribe(
      (data) => {
        this.personList = data;
      }
    );
  }

  private clearForm() {
    this.personForm.setValue({
      id: '',
      name: '',
      lastname: '',
      cuit: 0,
      url_img: '',
      interest: '',
      birthday: '',
      location: '',
    });
  }

  private loadForm(person: Person) {
    this.personForm.setValue({
      id: person.id,
      name: person.name,
      lastname: person.lastname,
      cuit: person.cuit,
      url_img: person.url_img,
      interest: person.interest,
      birthday: person.birthday,
      location: person.location,
    });
  }

  onSubmit(id: number) {
    let person: Person = this.personForm.value;
    if (this.personForm.get('id')?.value == '') {
      this.personaService.save(person).subscribe(
        (newPerson: Person) => {
          this.personList.push(newPerson);
        }
      );
    } else {
      this.personaService.update(id, person).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }


  public onNewPerson() {
    this.clearForm();
  }

  public onEditPerson(index: number) {
    let person: Person = this.personList[index];
    this.loadForm(person);
  }

  public onDeletePerson(index: number) {
    let person: Person = this.personList[index];
    if (confirm("¿Estás seguro que deseas borrar el texto seleccionado?")) {
      this.personaService.delete(person.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  /*Login Configuration */

  touch() {
    console.log("Tocastes login!");
  }

  public onSub(e: Event) {
    e.preventDefault();
    this.authService.login(this.loginForm.value).subscribe(
      (response: Boolean) => {
        if (response) {
          this.router.navigate(['/']);
          window.location.reload();
        }
        else
          this.loginError = true;
        console.log("No se pudo encontrar el usuario en la base de datos");
      }
    );
  }
  get Email() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }

  clear(): void {
    this.loginForm.setValue({
      email: '',
      password: ''
    });
    this.loginError = false;
  }
}
