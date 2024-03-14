/*
此為外掛欄位wtite mode的樣板，修改/置換的項事如下
修改import 擴充屬性(ExProps)的interface
修改selector和templateUrl路徑
修改classname
修改 @Input() exProps 的interface
*/

import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormTools } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { DemoFieldExProps } from '../props/demo-field.props.component';
import { SelectDataComponent } from '../select-data/select-data.component';
import { UofxDialogController } from '@uofx/web-components/dialog';
import { categorys } from 'src/app/model/eaiModel';
import { eaiService } from '@service/eai-service';

/*修改*/
/*↑↑↑↑修改import 各模式的Component↑↑↑↑*/

/*修改*/
/*置換selector和templateUrl*/
@Component({
  selector: 'uofx-demo-field-write-component',
  templateUrl: './demo-field.write.component.html',
})

/*修改*/
/*置換className*/
export class DemoFieldWriteComponent
  extends BpmFwWriteComponent
  implements OnInit {

  /*修改*/
  /*置換className*/
  @Input() exProps: DemoFieldExProps;
  @Input() value: customerInfo
  form: UntypedFormGroup;
  items: Array<categorys> = [];

  returnValue:string="QQQ";


  constructor(
    private cdr: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private tools: UofxFormTools,
    private es: eaiService,
    private dialogCtrl: UofxDialogController
  ) {
    super();
  }

  Open()
  {
this.dialogCtrl.create({
  component: SelectDataComponent,
  size: 'large',
  params: {
     /*開窗要帶的參數*/
     url:this.pluginSetting.entryHost
  }
}).afterClose.subscribe({
  next: res => {
  /*關閉視窗後處理的訂閱事件*/

  if (res) {
    this.returnValue = res;
   }
}
});
  }

  ngOnInit(): void {

    this.initForm();

    this.es.serverUrl = this.pluginSetting.entryHost;
    this.es.getCategorys().subscribe((res) => {
      this.items = res;
    })

    this.parentForm.statusChanges.subscribe((res) => {
      if (res === 'INVALID' && this.selfControl.dirty) {
        if (!this.form.dirty) {
          Object.keys(this.form.controls).forEach((key) => {
            this.tools.markFormControl(this.form.get(key));
          });
          this.form.markAsDirty();
        }
      }
    });

    this.form.valueChanges.subscribe((res) => {
      this.selfControl?.setValue(res);
      /*真正送出欄位值變更的函式*/
      console.log(res);
      this.valueChanges.emit(res);
    });
    this.cdr.detectChanges();
  }

  initForm() {
    this.form = this.fb.group({
      category: this.value?.category || '',
      companyName: [this.value?.companyName || '', Validators.required],
      address: [this.value?.address || '', Validators.required],
      phone: [this.value?.phone || '', [Validators.pattern(/^09\d{8}$/)]],
    });

    if (this.selfControl) {
      // 在此便可設定自己的驗證器
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }
  }

  /*判斷如果是儲存不用作驗證*/
  checkBeforeSubmit(): Promise<boolean> {
    return new Promise((resolve) => {
      const value = this.form.value;
      resolve(true);
    });
  }
}


/*外掛欄位自訂的證器*/
function validateSelf(form: UntypedFormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  };
}


export interface customerInfo {
  companyName: string;
  address: string;
  phone: string;
  category: string;
}
