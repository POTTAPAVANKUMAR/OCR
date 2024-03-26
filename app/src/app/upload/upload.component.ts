// upload.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  ocrText: string | undefined;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://127.0.0.1:5000/ocr', formData).subscribe(
      response => {
        if (response && response.text) {
          this.ocrText = response.text;
        } else {
          console.error('No text extracted from image.');
        }
      },
      error => {
        console.error('Error occurred while performing OCR:', error);
      }
    );
  }
}
