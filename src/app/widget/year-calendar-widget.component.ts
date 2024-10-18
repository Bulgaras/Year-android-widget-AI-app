import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetService } from './widget.service';

@Component({
  selector: 'ns-year-calendar-widget',
  templateUrl: './year-calendar-widget.component.html',
  styleUrls: ['./year-calendar-widget.component.css']
})
export class YearCalendarWidgetComponent implements OnInit {
  @Input() widgetId: number;
  currentYear: number;
  weeks: any[][];
  theme: any;

  constructor(private widgetService: WidgetService) {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.generateCalendar();
    this.loadTheme();
  }

  generateCalendar() {
    this.weeks = this.widgetService.generateYearCalendar(this.currentYear);
  }

  loadTheme() {
    this.theme = this.widgetService.getTheme(this.widgetId);
  }

  nextYear() {
    this.currentYear++;
    this.generateCalendar();
  }

  previousYear() {
    this.currentYear--;
    this.generateCalendar();
  }

  setYear(year: number) {
    this.currentYear = year;
    this.generateCalendar();
  }

  exportTheme() {
    this.widgetService.exportTheme(this.widgetId);
  }

  importTheme(themeData: string) {
    this.theme = this.widgetService.importTheme(this.widgetId, themeData);
  }

  getDayClass(day: any): string[] {
    const classes = [];
    if (day.isWeekend) classes.push(this.theme.weekend);
    if (day.isCurrentDay) classes.push(this.theme.currentDay);
    if (day.isCurrentMonth) classes.push(this.theme.currentMonth);
    return classes;
  }
}