import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  public fakeForm: FormGroup = new FormGroup({})
  buttonClick(){
    this.fakeForm.reset();
    this.toastr.success('', 'Thank You for reaching us ', {
      timeOut: 3000
  });
}

}
