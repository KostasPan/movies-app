import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-movies-chart',
  templateUrl: './movies-chart.component.html',
  styleUrls: ['./movies-chart.component.css']
})
export class MoviesChartComponent implements OnInit {

  @Input() movies!: Array<Movie>;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Average Votes' },
    ]
  };

  ngOnInit(): void {
  }

  private calcMovieTitles = (): Array<string> => {
    return this.movies.map(m => m['title']);
  }
  private calcMovieVotesAverage = (): Array<number> => {
    return this.movies.map(m => m['vote_average']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.movies);
    if (changes['movies']?.currentValue) {
      this.barChartData.labels = this.calcMovieTitles()
      this.barChartData.datasets[0].data = this.calcMovieVotesAverage()
      this.chart?.update();
    }
  }
}
