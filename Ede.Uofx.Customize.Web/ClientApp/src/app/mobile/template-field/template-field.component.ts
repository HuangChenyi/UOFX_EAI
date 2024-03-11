import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UofxCameraPlugin, UofxGeolocationPlugin, UofxToastPlugin } from '@uofx/app-native';

import { BpmFwWriteComponent } from '@uofx/app-components/form';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UofxFormTools } from '@uofx/web-components/form';

@Component({
  selector: 'app-template-field',
  templateUrl: './template-field.component.html',
  styleUrls: ['./template-field.component.css']
})
export class TemplateFieldComponent extends BpmFwWriteComponent implements OnInit {
  // label: string = '🎉Hello World';
  form: FormGroup;
  value: any;

  constructor(private uofxGeolocation: UofxGeolocationPlugin, private cdr: ChangeDetectorRef,
    private uofxToast: UofxToastPlugin, private uofxCamera: UofxCameraPlugin,
    private fb: FormBuilder, private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      message: this.value?.message || '',
    });


    this.form.valueChanges.subscribe((res) => {
      this.selfControl?.setValue(res);
      /*真正送出欄位值變更的函式*/
      this.valueChanges.emit(res);
    });
    this.cdr.detectChanges();

  }

}
