import { Subscription } from 'rxjs';
import { Message } from './../../models/Message';
import { DataService } from 'src/app/services/data.service';
import { Publication } from './../../models/Publication';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.less']
})
export class MessageEditComponent implements OnInit {

  @Input()
  publication: Publication;

  message: Message;

  statusMessage = '';
  loadingData = true;
  sendingMessage = false;

  isContentValid = false;

  isLogged = false;

  subscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this.authService.roleSetEvent.subscribe(
      next => {
        this.isLogged = this.authService.isAuthenticated;
        this.loadingData = false;
      }

    )
    this.authService.checkIfAlreadyAuthenticated();
  }

  loadData() {
    this.message = new Message();
    this.checkIfContentIsValid();
  }

  checkIfContentIsValid() {
    if(this.message.content) {
      this.isContentValid =  this.message.content.trim().length > 0;
    } else {
      this.isContentValid =  false;
    }
  }

  onSubmit() {
    this.sendingMessage = true;
    this.dataService.getUsers().subscribe(
      next =>  {
        this.message.author = next.find(user => user.username === this.authService.username);
        if(this.message.author) {
          this.dataService.addMessage(this.publication.id, this.message).subscribe(
            next => window.location.reload(),
            error => this.statusMessage = 'Impossible d\'enregistrer le nouveau message... Réessayez plus tard.'
          );
        } else {
          this.statusMessage = 'Utilisateur introuvable';
        }
      },
      error => this.statusMessage = 'Communication avec le serveur interrompue'
    )
  }

  accessLogin() {
    this.router.navigate(['/login']);
  }
}
