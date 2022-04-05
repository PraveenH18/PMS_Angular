import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { DbService } from '../../services/db.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { ActivatedRoute } from '@angular/router';

const sampleData:any = {
  "email": "rosh@gmail.com",
  "password": "$2a$10$b62tTk3EDNT83iW5ja.da.CzXqWz7wrMUh81SVuXOAERUJlgbQvjK",
  "id": 1
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: DbService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)],
      providers: [DbService,
        {provide : ActivatedRoute, useValue : { snapshot: { params : { user:"admin"}}}}]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new DbService(httpClientSpy as any);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
  });


  it('valid credentails', () => {
   
  });

});

