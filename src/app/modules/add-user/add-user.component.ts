import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  closeResult = '';
  dropdownList = [];
  selectedItems = [];
  /* Set minimum date Limit here   */
  minDate = { year: 1900, month: 1, day: 1 };
  date = new Date();
  maxDate;
  dropdownSettings: IDropdownSettings;
  addDetails: FormGroup;

  setUserData = {};

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private modalService: NgbModal,
    private createUSer: UserServiceService
  ) {}

  ngOnInit(): void {
    this.maxDate = {
      year: this.date.getFullYear(),
      month: this.date.getMonth()+1,
      day: this.date.getDate(),
    };
    this.setDropDownData();
    this.formDetails();
  }

  formDetails() {
    this.addDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('',[Validators.required]),
      dropdownList: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      decript: new FormControl('', [Validators.required]),
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService
      .open(content,  { size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  setDropDownData() {
    /* Added languages in dropdown */
    this.dropdownList = [
      { item_id: 1, item_text: ' English(US)' },
      { item_id: 2, item_text: ' Latin' },
      { item_id: 3, item_text: ' French' },
      { item_id: 4, item_text: ' English(UK)' },
      { item_id: 5, item_text: ' German' },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
  }

  getUserDetails() {
    let languages = this.addDetails.value.dropdownList;
    let converString = [];
    languages.map((res) => converString.push(res['item_text']));
    let datesModified = this.formatedDate(this.addDetails.value.date);
    this.setUserData = {
      fullName: this.addDetails.value.name,
      dob: datesModified,
      language: converString.toString(),
      gender: this.addDetails.value.gender,
      description: this.addDetails.value.decript,
    };
    this.createUSer.addUser(this.setUserData).subscribe(
      (response) => {
         this.resetFrom(), this.setDropDownData();
      },
      (error) => console.log(error)
    );
  }
  formatedDate(data) {
    const myDate = `${this.months[data.month - 1]} ${data.day}, ${data.year}`; //Jan 20, 1992;
    const formattedDate = myDate;
    return formattedDate;
  }
  resetFrom() {
    this.addDetails.reset();
  }
}
