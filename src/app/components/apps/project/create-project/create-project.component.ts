import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  /** define form group */
  form : FormGroup;
  /** define defult select items in form*/
  projectTypeList = ["Hourly" , "Fix price"];
  priorityList = ["Low" , "Medium" , "High" , "Urgent"];
  projectSizeList = ["Small" , "Medium" ,"Big"];
  /** define array to save file from dropzone */
  files: File[] = [];
  uploadedFile = [];

  constructor(
    private _formBuilder: FormBuilder,
  ) {

    this.form = this._formBuilder.group({
      project_title :[''],
      client_name : [''],
      project_rate: [''],
      project_type: [''],
      priority: [''],
      project_size : [''],
      start_date : [''],
      end_date: [''],
      details : [''],
      project_file :['']
    });
   }

  ngOnInit(): void {
  }

  /**trigger when click on add new project button */
  submitCreateProject(data){
    // this.form.reset();
    console.log(data);
  }

  /**DropZone setting */
  onSelect(event) {
    /**array to show the selected files */    
    this.files.push(...event.addedFiles);
    /**get name files */
    for (let file of event.addedFiles) {
      this.uploadedFile.push(file.name);
    }
    /**assign uploaded file to project_file in form */
    this.form.patchValue({project_file: this.uploadedFile});
  }

  onRemove(event) {
    /**remove file from the selected files array*/    
    this.files.splice(this.files.indexOf(event), 1);
    /**remove file from the uploadedFile array*/    
    this.uploadedFile.splice(this.uploadedFile.indexOf(event.name), 1);
  
    this.form.patchValue({project_file: this.uploadedFile});
  }

}
