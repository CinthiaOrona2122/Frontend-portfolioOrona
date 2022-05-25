import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Achievement } from 'src/app/models/achievement';
import { AchievementsService } from 'src/app/services/achievements.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  public achieveList: Achievement[] = [];
  achieveForm: FormGroup;
  isUserLogged: Boolean = false;


  constructor(
    private achievementService: AchievementsService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.achieveForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      project_type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }
  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.achievementService.getAll().subscribe(
      (data) => {
        this.achieveList = data;
      }
    );
  }

  private clearForm() {
    this.achieveForm.setValue({
      id: '',
      name: '',
      description: '',
      url: '',
      project_type: '',
    });
  }

  private loadForm(achievement: Achievement) {
    this.achieveForm.setValue({
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      url: achievement.url,
      project_type: achievement.project_type
    });
  }

  onSubmit(id: number) {
    let achievement: Achievement = this.achieveForm.value;
    if (this.achieveForm.get('id')?.value == '') {
      this.achievementService.save(achievement).subscribe(
        (newAchievement: Achievement) => {
          this.achieveList.push(newAchievement);
        }
      );
    } else {
      this.achievementService.update(id, achievement).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  public onNewAchievement() {
    this.clearForm();
  }

  public onEditAchievement(index: number) {
    let achievement: Achievement = this.achieveList[index];
    this.loadForm(achievement);
  }

  public onDeleteAchievement(index: number) {
    let achievement: Achievement = this.achieveList[index];
    if (confirm("¿Estás seguro que deseas borrar el item seleccionado?")) {
      this.achievementService.delete(achievement.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

} 
