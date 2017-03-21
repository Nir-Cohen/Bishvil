import { DatePickerOptions, DateModel } from 'ng2-datepicker';
export interface User {
    name: string; // required with minimum 5 characters
    data: string;
    date_start: DateModel;
    date_finish: DateModel;
}