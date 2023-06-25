import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLimit',
})
export class DescriptionLimitPipe implements PipeTransform {
  transform(description: string, limit = 100, ellipsis = '...'): string {
    return description.length > limit
      ? description.substr(0, limit) + ellipsis
      : description;
  }
}
