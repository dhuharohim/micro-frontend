import { AfterViewInit, Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public charts: any[] = [];
  ngOnInit(): void {
      this.charts = [
        {
          name: 'Area Chart',
          identifier: 'areaChart'
        },
        {
          name: 'Line Chart',
          identifier: 'lineChart'
        },
        {
          name: 'Column Chart',
          identifier: 'columnChart'
        },
        {
          name: 'Bar Chart',
          identifier: 'barChart'
        },
        {
          name: 'Pie Chart',
          identifier: 'pieChart'
        },
        {
          name: 'Donut Chart',
          identifier: 'donutChart'
        }
      ]
  }
  
  ngAfterViewInit(): void {
    // Area Chart
    new ApexCharts(document.querySelector('#areaChart'), {
      series: [{
        name: 'Product A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: { type: 'area', height: '350' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
    }).render();

    // Line Chart
    new ApexCharts(document.querySelector('#lineChart'), {
      series: [{
        name: 'Product A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: { type: 'line', height: '350' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
    }).render();

    // Column Chart
    new ApexCharts(document.querySelector('#columnChart'), {
      series: [{
        name: 'Product A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: { type: 'bar', height: '350' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
    }).render();

    // Bar Chart
    new ApexCharts(document.querySelector('#barChart'), {
      series: [{
        name: 'Product A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: { type: 'bar', height: '350' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
    }).render();

    // Pie Chart
    new ApexCharts(document.querySelector('#pieChart'), {
      series: [30, 40, 35, 50, 49],
      chart: { type: 'pie', height: '350' },
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    }).render();

    // Donut Chart
    new ApexCharts(document.querySelector('#donutChart'), {
      series: [30, 40, 35, 50, 49],
      chart: { type: 'donut', height: '350' },
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    }).render();

    // Radial Chart
    new ApexCharts(document.querySelector('#radialChart'), {
      series: [44, 55, 67, 83],
      chart: { type: 'radialBar', height: '350' },
      plotOptions: { radialBar: { hollow: { margin: 0, size: '70%' } } },
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    }).render();
  }
}
