import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  EventRegistrationModalPayload,
  EventRegistrationResultEnum,
  EventRegistrationResultModel
} from "./event-registration-result.model";
import { EventRegistrationAsyncValidator } from "../../../shared/validators/event-registration.validator";

@Component({
  templateUrl: "./event-registration.overlay.html",
  styleUrls: ["./event-registration.overlay.css"]
})
export class EventRegistrationOverlayComponent {
  @Input()
  eventModel: EventCardComponentModel;

  firstnameControl: FormControl;
  lastnameControl: FormControl;
  emailControl: FormControl;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private validator: EventRegistrationAsyncValidator
  ) {
    this.firstnameControl = this.formBuilder.control(undefined, Validators.required);
    this.lastnameControl = this.formBuilder.control(undefined, Validators.required);
    this.emailControl = this.formBuilder.control(undefined, {
      validators: [Validators.email, Validators.required],
      updateOn: "blur"
    });
    this.formGroup = this.formBuilder.group(
      {
        firstname: this.firstnameControl,
        lastname: this.lastnameControl,
        contactEmail: this.emailControl
      },
      {
        updateOn: "change",
        asyncValidators: this.validator.validator()
      }
    );
  }

  registerClicked() {
    if (this.formGroup.invalid) {
      return;
    }

    this.activeModal.close(<EventRegistrationResultModel>{
      modalResult: EventRegistrationResultEnum.Success,
      payload: {
        firstname: this.firstnameControl.value,
        lastname: this.lastnameControl.value,
        email: this.emailControl.value,
        eventId: this.eventModel.id
      }
    });
  }

  crossClicked() {
    this.activeModal.close(<EventRegistrationResultModel>{
      modalResult: EventRegistrationResultEnum.Fail,
      payload: undefined
    });
  }

  setFormGroupValues(formGroupValues: EventRegistrationModalPayload) {
    if (!!formGroupValues) {
      this.firstnameControl.setValue(formGroupValues.firstname);
      this.lastnameControl.setValue(formGroupValues.lastname);
      this.emailControl.setValue(formGroupValues.email);
    }
  }

  hasErrorToDisplay(formControl: FormControl): boolean {
    return formControl.dirty && formControl.errors && Object.values(formControl.errors).some((value) => value === true);
  }
}
