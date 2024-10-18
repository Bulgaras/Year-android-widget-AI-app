import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  generateYearCalendar(year: number): any[][] {
    const weeks = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (currentDate.getDay() === i) {
          week.push({
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            isWeekend: i === 5 || i === 6,
            isCurrentDay: this.isCurrentDay(currentDate),
            isCurrentMonth: currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear(),
            weekNumber: this.getWeekNumber(currentDate)
          });
          currentDate.setDate(currentDate.getDate() + 1);
        } else {
          week.push(null);
        }
      }
      weeks.push(week);
    }
    return weeks;
  }

  private isCurrentDay(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  getTheme(widgetId: number): any {
    const savedTheme = ApplicationSettings.getString(`widget_${widgetId}_theme`);
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return this.getDefaultTheme();
  }

  private getDefaultTheme(): any {
    return {
      showGridLines: true,
      background: 'bg-white dark:bg-gray-800',
      year: 'text-xl font-bold text-black dark:text-white',
      yearArrows: 'text-blue-500 dark:text-blue-300',
      month: 'text-sm font-semibold text-gray-600 dark:text-gray-300',
      weekNumber: 'text-xs text-gray-500 dark:text-gray-400',
      weekend: 'text-red-500 dark:text-red-300',
      currentDay: 'bg-blue-500 text-white dark:bg-blue-700',
      currentMonth: 'font-bold'
    };
  }

  saveTheme(widgetId: number, theme: any) {
    ApplicationSettings.setString(`widget_${widgetId}_theme`, JSON.stringify(theme));
  }

  exportTheme(widgetId: number): string {
    const theme = this.getTheme(widgetId);
    return JSON.stringify(theme);
  }

  importTheme(widgetId: number, themeData: string): any {
    try {
      const theme = JSON.parse(themeData);
      this.saveTheme(widgetId, theme);
      return theme;
    } catch (error) {
      console.error('Error importing theme:', error);
      return this.getDefaultTheme();
    }
  }
}