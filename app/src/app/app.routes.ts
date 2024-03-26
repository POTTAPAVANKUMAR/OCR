import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';

export let routes: Routes = [];

routes = [
    {
        path: '',
        component: AppComponent,
        data : {title:'welcome'}
    },
    {
        path: 'ocr',
        component: UploadComponent,
        data : {title:'OCR'}
    },
    {
      path: '**',
      redirectTo: '',
    }
]
