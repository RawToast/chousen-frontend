import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { GameResponse } from './gameresponse';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {

    constructor(private http: Http) { }

    // 88107f56-54c4-4e0d-8e1c-41532b0848be
    private rootApiUrl = 'http://localhost:8080';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});
    private fetching: boolean;

    // private data1 = new Subject<GameResponse>();
    private data2 = new BehaviorSubject<GameResponse>(undefined);

    awaitData(id: string): Observable<GameResponse> {
        console.log('Awaiting ' + id);

        if ((typeof this.data2.getValue() === 'undefined') && !this.fetching) {
            this.refresh2(id);
        }
        return this.getData1();
    }

    refresh2(id: string) {
        console.log('Refreshing ' + id);
        const url = `${this.rootApiUrl}/game/${id}`;

        this.http.get(url).toPromise().then(data => {
            this.fetching = false;
            const result = data.json() as GameResponse;
            this.data2.next(result);
        }).catch(err => {
            this.fetching = false;
            this.data2.error(err);
        });
        return this.data2;
    }

    getData1(): Observable<GameResponse> {
        return this.data2.asObservable();
    }

    // refresh(id: string) {
    //     console.log('Refreshing ' + id);
    //     const url = `${this.rootApiUrl}/game/${id}`;
    //     this.http.get(url).toPromise().then(data => {
    //         const result = data.json() as GameResponse;
    //         this.data1.next(result);
    //     });
    // }

    getGame(id: string): Promise<GameResponse> {
        const url = `${this.rootApiUrl}/game/${id}`;
        return this.http.get(url)
          .toPromise()
          .then(response => {
            const result = response.json() as GameResponse;
            return result;
        } )
          .catch(this.handleError);
    }

    create(name: string): Promise<GameResponse> {
        const url = `${this.rootApiUrl}/game/${name}/start`;
        return this.http
          .post(url, JSON.stringify({}))
          .toPromise()
          .then(response => {
            const result = response.json() as GameResponse;
            return result;
        } )
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
