import { Observable } from 'rxjs/Observable';

import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class RefreshService {

    rankingRefresh = new EventEmitter();

    ranking() {
        return this.rankingRefresh;
    }

    refreshRanking() {
        this.rankingRefresh.emit();
    }
}