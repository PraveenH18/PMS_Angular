import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './common/about-us/about-us.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './common/home-page/home-page.component';
import { NavComponent } from './common/nav/nav.component';
import { MessageComponent } from './common/message/message.component';
import { EditReasonComponent } from './shared/edit-reason/edit-reason.component';
import { EditHistoryComponent } from './shared/edit-history/edit-history.component';

//I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsComponent,
    NavComponent,
    MessageComponent,
    MessageComponent,
    EditReasonComponent,
    EditHistoryComponent,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
