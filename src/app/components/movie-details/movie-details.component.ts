import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { Rating } from 'src/app/interfaces/rating';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { config as CONFIG } from 'src/utils/config';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  public movie = <Movie>{};
  public error_message!: string;
  public MDB_IMG_BASE_URL: string = CONFIG.MOVIEDB_IMAGES;
  public rating!: number;

  private session_id!: string;

  constructor(private movieDetailsService: MovieDetailsService, private snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.initMovie();
  }

  private initMovie() {
    this.movieDetailsService.getMovieDetails(this.movieDetailsService.mid).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: (e) => {
        this.snackBarService.openSnackBar('Error occurred, try again later.', 'x');
        this.error_message = e.error.status_message;
        console.error(e);
      },
    });
  }

  rateMovie() {
    this.session_id = this.movieDetailsService.getGuestSessionIdFromCookie();
    if (!this.session_id) {
      this.setNewGuestSessionId();
    } else {
      this.postRating(this.movie.id, this.session_id, { value: this.rating });
    }
  }

  postRating(mid: number, sid: string, r: Rating) {
    if (this.rating && this.rating >= 0 && this.rating <= 10) {
      this.movieDetailsService.postRating(mid, sid, r).subscribe({
        next: (response) => {
          this.snackBarService.openSnackBar(`Rating: ${response.status_message}`, 'x');
        },
        error: (e) => {
          this.snackBarService.openSnackBar('Error occurred, try again later.', 'x');
          console.error(e);
        },
      });
    }
  }

  setNewGuestSessionId() {
    const cname = CONFIG.GUEST_SESSIONID_COOKIE_NAME;
    this.movieDetailsService.getGuestSessionIdFromApi().subscribe({
      next: (response) => {
        this.session_id = response.guest_session_id;
        this.movieDetailsService.setGuestSessionIdCookie(
          cname,
          response.guest_session_id,
          new Date(response.expires_at)
        );
        this.postRating(this.movie.id, this.session_id, { value: this.rating });
      },
      error: (e) => {
        this.snackBarService.openSnackBar('Error occurred, try again later.', 'x');
        console.error(e);
      },
    });
  }
}
