import { Component, OnInit } from '@angular/core';
import { WeightEntriesService } from '../shared/weight-entries.service';
import { Entry } from '../model/entry';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {
  entry: Entry;
  constructor(private entriesSvc: WeightEntriesService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.currentRoute.snapshot.params.id;
    this.entriesSvc.getEntries().subscribe(entries => {
      this.entry = entries.find(e => {
        return e.id === id;
      });
    });
  }

}
