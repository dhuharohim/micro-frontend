import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ChartType, ApexOptions } from 'ng-apexcharts';

interface Chart {
  name: string;
  identifier: string;
  type: ChartType;
  data: number[];
  categories?: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public charts: Chart[] = [];

  ngOnInit(): void {
    this.charts = [
      {
        name: 'Area Chart',
        identifier: 'areaChart',
        type: 'area',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Line Chart',
        identifier: 'lineChart',
        type: 'line',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Column Chart',
        identifier: 'columnChart',
        type: 'bar',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      {
        name: 'Bar Chart',
        identifier: 'barChart',
        type: 'bar',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      // {
      //   name: 'Pie Chart',
      //   identifier: 'pieChart',
      //   type: 'pie',
      //   data: [30, 40, 35, 50, 49],
      //   categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      // },
      // {
      //   name: 'Donut Chart',
      //   identifier: 'donutChart',
      //   type: 'donut',
      //   data: [30, 40, 35, 50, 49],
      //   categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      // },
    ];
  }
  
  ngAfterViewInit(): void {
    this.charts.forEach(chart => {
      this.initializeChart(chart);
    });
  }

  initializeChart(chart: Chart): void {
    const options: ApexOptions = {
      series: chart.type === 'pie' || chart.type === 'donut' ? chart.data : [{ data: chart.data }],
      chart: { type: chart.type, height: 350 },
      labels: chart.categories,
    };
    

    new ApexCharts(document.querySelector(`#${chart.identifier}`), options).render();
  }
}
