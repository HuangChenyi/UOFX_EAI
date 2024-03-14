const exposes = {
  // 設定要開放外部使用欄位和頁面
  // ***目前僅實作外掛欄位
  //屬性名稱會對應到/assets/configs/fields-runtime.json 的exposedModule
  web: {
    './TemplateField': './src/app/web/template-field/template-field.module.ts',
    './DemoField': './src/app/web/demo-field/demo-field.module.ts'
  },
  app: {
    // './TemplateField': './src/app/web/template-field/template-field.module.ts'
  }
};

module.exports = exposes;
