import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule,DatePipe, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import {MatSidenavModule} from '@angular/material/sidenav';
import { WaitDailogComponent } from './wait-dailog/wait-dailog.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { StatusHighLighterDirective } from './status-high-lighter.directive';
import { MessageHighlighterDirective } from './message-highlighter.directive';

// npm install ngx-toastr — save
//npm install @syncfusion/ej2-angular-calendars --save
// npm i bootstrap-icons --save
@NgModule({
  declarations: [

  
    WaitDailogComponent,
          StatusHighLighterDirective,
          MessageHighlighterDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCommonModule,
    CommonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCardModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    DropDownListModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    DateTimePickerModule,
    MatSidenavModule,
    NgxChartsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatDividerModule

  ],
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCommonModule,
    CommonModule,
    MatDialogModule,
    HttpClientModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCardModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    DropDownListModule,
    MatPaginatorModule,
    ToastrModule,
    DateTimePickerModule,
    MatSidenavModule,
    NgxChartsModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatDividerModule,
    StatusHighLighterDirective,
    MessageHighlighterDirective

  
  ],providers:[DatePipe,TitleCasePipe]
})
export class SharedModule { }
