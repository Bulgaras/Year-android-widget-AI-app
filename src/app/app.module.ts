import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { YearCalendarWidgetComponent } from './widget/year-calendar-widget.component';
import { WidgetService } from './widget/widget.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent, YearCalendarWidgetComponent],
  providers: [WidgetService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}