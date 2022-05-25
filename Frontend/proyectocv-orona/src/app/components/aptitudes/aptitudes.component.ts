import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aptitude } from 'src/app/models/aptitude';
import { AptitudeService } from 'src/app/services/aptitude.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  public aptitudeList: Aptitude[];
  aptitudeForm: FormGroup;
  isUserLogged: Boolean = false;

  message: '';

  constructor(
    private aptitudeService: AptitudeService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService

  ) {
    this.aptitudeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      confirmerName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.aptitudeService.getAll().subscribe(
      (data) => {
        this.aptitudeList = data;
      }
    );
  }

  private clearForm() {
    this.aptitudeForm.setValue({
      id: '',
      name: '',
      confirmerName: '',
      description: ''
    });
  }

  private loadForm(aptitude: Aptitude) {
    this.aptitudeForm.setValue({
      id: aptitude.id,
      name: aptitude.name,
      confirmerName: aptitude.confirmerName,
      description: aptitude.description
    });
  }

  onSubmit(id: number) {
    let aptitude: Aptitude = this.aptitudeForm.value;
    if (this.aptitudeForm.get('id')?.value == '') {
      this.aptitudeService.save(aptitude).subscribe(
        (newAptitude: Aptitude) => {
          this.aptitudeList.push(newAptitude);
        }
      );
    } else {
      this.aptitudeService.update(id, aptitude).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  public onNewAptitude() {
    this.clearForm();
  }

  public onEditAptitude(index: number) {
    let aptitude: Aptitude = this.aptitudeList[index];
    this.loadForm(aptitude);
  }

  public onDeleteAptitude(index: number) {
    let aptitude: Aptitude = this.aptitudeList[index];
    if (confirm("¿Estás seguro que deseas borrar el item seleccionado?")) {
      this.aptitudeService.delete(aptitude.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


}


