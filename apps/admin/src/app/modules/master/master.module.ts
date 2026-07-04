import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { CountryService } from './services/country.service';

@NgModule({
  providers: [CountryService],
  imports: [CommonModule, MasterRoutingModule],
})
export class MasterModule {}
