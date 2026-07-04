import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { DistrictService } from './services/district.service';
import { CityService } from './services/city.service';

@NgModule({
  providers: [CountryService, StateService, DistrictService, CityService],
  imports: [CommonModule, MasterRoutingModule],
})
export class MasterModule {}
