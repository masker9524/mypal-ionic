import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MykiProvider } from '../../providers/myki';
import { Myki } from '../../models/myki';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-load-cards',
  templateUrl: 'load-cards.html'
})
export class LoadCardsPage {

  errorNoCards: boolean = false;
  loadingAccount: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mykiProvider: MykiProvider,
  ) { }

  ionViewDidLoad() {
    this.loadAccount()
  }

  loadAccount() {
    this.loadingAccount = true;

    // load the account and get the myki cards
    this.mykiProvider.getAccountDetails().then(
      () => {
        // check if we have more than 1 card
        if (this.mykiProvider.mykiAccount.cards.length >= 1) {
          // set active card to first card
          this.mykiProvider.setActiveCard(this.mykiProvider.mykiAccount.cards[0].id)
          
          // go to tabs page
          this.navCtrl.setRoot(TabsPage, null, { animate: false, direction: 'forward' })
        } else {
          // show no cards error
          this.errorNoCards = true;
        }
      }).catch(error => {
        // error
      }).then(() => {
        this.loadingAccount = false;
      })
  }

}