import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TripsService } from 'src/app/services/Trips.service';
import { Trips } from '../../../models/model';

@Component({
  selector: 'app-add-new-trip',
  templateUrl: './add-new-trip.component.html',
  styleUrls: ['./add-new-trip.component.scss']
})
export class AddNewTripComponent {

  modelForm: FormGroup

  constructor(private formBuilder: FormBuilder, private tripService: TripsService){}

  // @Output() showFormOff = new EventEmitter<boolean>()
  // @Input() showFormOn:boolean

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      fname: new FormControl('',[ Validators.required,Validators.pattern('[A-Za-z\\s\\-]+')]),
      fdestiny: new FormControl( '',[ Validators.required,Validators.pattern('[A-Za-z\\s\\-]+')]),
      fstartDate: new FormControl( '',[Validators.required]),
      fendDate: new FormControl('',[Validators.required]),
      fpricePerPerson: new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,10}')]),
      fmaxPeople: new FormControl('',[Validators.required, Validators.pattern('[0-9]{1,3}')]),
      fdescription: new FormControl('',[Validators.required]),
      fimg:'assets/images/default_img.png',
      flink:'assets/images/default_img.png'
    })
    
  }

  onSubmit(form :FormGroup) : void{
    let newTrip : Trips = {
    id: this.tripService.getNextid(),
    name : this.modelForm.value.fname,
    destiny : this.modelForm.value.fdestiny,
    startDate : this.modelForm.value.fstartDate,
    endDate : this.modelForm.value.fendDate,
    pricePerPerson : parseInt(this.modelForm.value.fpricePerPerson),
    maxPeople : parseInt(this.modelForm.value.fmaxPeople),
    description : this.modelForm.value.fdescription,
    booked:0,
    rating:0,
    img : this.modelForm.value.fimg,
    link : this.modelForm.value.flink

    }
    this.tripService.createTrip(newTrip)
  
    this.modelForm.reset()
    // this.closeForm()

  }


  // closeForm(){
  //   let offForm = !this.showFormOn
  //   this.modelForm.reset()
  //   this.showFormOff.emit(offForm)
  // }
  
}
