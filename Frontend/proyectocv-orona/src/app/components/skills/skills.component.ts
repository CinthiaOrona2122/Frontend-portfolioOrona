import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Progressbar } from 'src/app/models/progressbar';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProgressbarService } from 'src/app/services/progressbar.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  public progressList: Progressbar[];
  progressForm: FormGroup;
  isUserLogged: Boolean = false;

  message: '';

  constructor(
    private progressbarService: ProgressbarService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService

  ) {
    this.progressForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      quote: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]]
    });
  }


  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.progressbarService.getAll().subscribe(
      (data) => {
        this.progressList = data;
      }
    );
  }

  private clearForm() {
    this.progressForm.setValue({
      id: '',
      name: '',
      quote: '',
      number: 0
    });
  }

  private loadForm(progressbar: Progressbar) {
    this.progressForm.setValue({
      id: progressbar.id,
      name: progressbar.name,
      quote: progressbar.quote,
      number: progressbar.number
    });
  }

  onSubmit(id: number) {
    let progressbar: Progressbar = this.progressForm.value;
    if (this.progressForm.get('id')?.value == '') {
      this.progressbarService.save(progressbar).subscribe(
        (newProgressbar: Progressbar) => {
          this.progressList.push(newProgressbar);
        }
      );
    } else {
      this.progressbarService.update(id, progressbar).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  public onNewProgressbar() {
    this.clearForm();
  }

  public onEditProgressbar(index: number) {
    let progressbar: Progressbar = this.progressList[index];
    this.loadForm(progressbar);
  }

  public onDeleteProgressbar(index: number) {
    let progressbar: Progressbar = this.progressList[index];
    if (confirm("¿Estás seguro que deseas borrar el item seleccionado?")) {
      this.progressbarService.delete(progressbar.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


}




