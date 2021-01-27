import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transformd(items: any[], field : string, value : string): any[] {  
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(it => 
    it[field].toLowerCase().indexOf(value.toLowerCase()) !=-1);
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
}

