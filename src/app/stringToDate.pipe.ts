import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate',
})
export class StringToDatePipe implements PipeTransform {
  transform(dateString: string): string | null {
    if (dateString) {
      const dateParts = dateString.split('/');
      let day = Number(dateParts[0]);
      const month = Number(dateParts[1]);
      const year = Number(dateParts[2]);

      // Check if the input date is valid
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (day > lastDayOfMonth) {
        day = lastDayOfMonth;
      }

      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) {
        return null;
      }

      const datePipe = new DatePipe('en-US');
      const transformedDate = datePipe.transform(date, 'dd/MMM/yyyy');

      return transformedDate;
    }
    return null;
  }
}
function moment(dateString: string, arg1: string) {
  throw new Error('Function not implemented.');
}
