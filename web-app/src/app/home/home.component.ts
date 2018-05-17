
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';
import { User } from '../_model/user';
import { UserServiceService } from '../_services/user-service.service';
import { ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]


})
export class HomeComponent implements OnInit {


  msgs: Message;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router, public location: Location, private cd: ChangeDetectorRef, private userService: UserServiceService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }






  currentUser: User;
  users: User[] = [];
  selectedUser = { _id: null, username: null };
  currentUserName;
  preUser;
  data = [];
  brands = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
  items = [
    {
      label: 'View', icon: 'fa-search', command: (event) => {

      }
      // routerLink: ['../user'], queryParams: { 'id': this.selectedUser._id }
    },
    {
      label: 'Delete', icon: 'fa-close', command: (event) => {
        this.confirmationService.confirm({
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. There are many variations of passages of lorem lpsum available.The majority have suffered alteration in some form, sed do eiusmod tempor ed do eiusmod tempor.',
          header: 'Section Title',
          icon: null,
          accept: () => {
            console.log('accept', this.selectedUser._id);
          },
          reject: () => {
            console.log('reject')
          }
        });
      }
    },

  ];

  onEditInit(event) {

    this.currentUserName = event.data.username;

    if (event.column.header == 'username') {
      this.preUser = event.data.username;
    }
    else if (event.column.header == 'Email') {

      this.preUser = event.data.email;
    }



    console.log(this.preUser);
  }

  onEditRow(event) {

    if (event.column.header == 'username') {
      this.userService.getUserExist(event.data.username)
        .subscribe((user) => {
          console.log(user)
          if (!user['data'].user) {
            this.confirmationService.confirm({
              message: 'User ' + this.currentUserName,
              header: 'Edit',
              icon: null,
              accept: () => {
                this.userService.update(event.data)
                  .subscribe((res) => {
                    if (res) {
                      this.messageService.add({ severity: 'success', summary: 'Add', detail: 'UserName  ' + this.preUser + ' change!' });
                    }
                  }, (error) => {
                    console.log(error);
                  })
                console.log(event);
                console.log('accept')
              },
              reject: () => {
                /*     this.loadAllUsers()
                      .subscribe(users => {
                        console.log(users['users']['data']);
                        this.data = users['users']['data'];
                        this.cd.markForCheck();
    
                      });*/
                console.log('reject')
              }
            })
          }
          else {
            this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'UserName  ' + event.data.username + ' Already Exist' });
            this.loadAllUsers()
              .subscribe(users => {
                console.log(users['users']['data']);
                this.data = users['users']['data'];
                this.cd.markForCheck();

              });
          }

        })
    }

    else if (event.column.header == 'Email') {

      if (
        RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(event.data.email)


      ) {

        this.userService.getEmailExist(event.data.email)
          .subscribe((user) => {
            if (!user['data'].user) {


              this.confirmationService.confirm({
                message: 'User ' + this.currentUserName,
                header: 'Edit',
                icon: null,
                accept: () => {
                  this.userService.update(event.data)
                    .subscribe((res) => {
                      if (res) {
                        this.messageService.add({ severity: 'success', summary: 'Add', detail: 'Email  ' + this.preUser + ' change!' });
                      }
                      console.log(res);
                    }, (error) => {
                      console.log(error);
                    })
                  console.log(event);
                  console.log('accept')
                },
                reject: () => {
                  this.loadAllUsers()
                    .subscribe(users => {
                      console.log(users['users']['data']);
                      this.data = users['users']['data'];
                      this.cd.markForCheck();

                    });
                  console.log('reject')
                }
              })
            }
            else {
              this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Email  ' + this.preUser + ' Already Exist' });
              this.loadAllUsers()
                .subscribe(users => {
                  console.log(users['users']['data']);
                  this.data = users['users']['data'];
                  this.cd.markForCheck();

                });
            }
          })


      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email  ' + this.preUser + ' Not Valid' });
      }
    }

  }



  deleteUser(id: string) {
    this.userService.delete(id).subscribe(() => {
      this.loadAllUsers()
        .subscribe((response) => {
          console.log(response);
          if (response != null) {
            /*  this.rows = response['users']['data'];
             this.cd.markForCheck(); */

            this.cd.markForCheck();


          }
        }, (error) => {

        })

    });
  }

  private loadAllUsers() {
    return this.userService.getAll()

  }
  private viewProfile(id) {

    this.router.navigate['./user/' + id]

  }
  onContextMenuSelect(event) {

    this.selectedUser._id = event.data._id;
    this.selectedUser.username = event.data.username;
    this.items = [
      {
        label: 'View', icon: 'fa-search', command: () => {


          this.router.navigate(['/user/'], { queryParams: { id: event.data._id }, skipLocationChange: true });
          window.history.pushState('', '', event.data.username)
        }
        //routerLink: ['../user'], queryParams: { 'id': this.selectedUser._id }
      },
      {
        label: 'Delete', icon: 'fa-close', command: (event) => {
          this.confirmationService.confirm({
            message: 'Are You Sure You Want To Delete User ' + this.selectedUser.username,
            header: 'Delete',
            icon: null,
            accept: () => {
              
              this.userService.delete(this.selectedUser._id)
                .subscribe((res) => {
                  if (res) {
                    this.loadAllUsers()
                      .subscribe(users => {

                        this.data = users['users']['data'];
                        this.cd.markForCheck();

                      });
                  }

                }, (error) => {
                  console.log(error);
                });
            },
            reject: () => {
              console.log('reject')
            }
          });
        }
      }
    ];
    this.cd.markForCheck();
  }
  onClick(res, username) {
    this.router.navigate(['/user/'], { queryParams: { id: res }, skipLocationChange: true });
    window.history.pushState('', '', username)

  }



  isMap(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
  update(data) {

  }

  ngOnInit() {


    this.loadAllUsers()
      .subscribe(users => {

        if (users) {

          this.data = users['users']['data'];
          this.cd.markForCheck();
        }
      });


  }
  save() {

    if (this.selectedUser._id) {

      this.confirmationService.confirm({
        message: 'User ' + this.currentUserName,
        header: 'Edit',
        icon: null,
        accept: () => {
          this.userService.update(this.selectedUser)
            .subscribe((res) => {
              if (res) {
                this.data = res['users']['data'];
                this.cd.markForCheck();
              }
            }, (error) => {
              console.log(error);
            })

          console.log('accept')
        },
        reject: () => {
          this.loadAllUsers()
            .subscribe(users => {
              
              this.data = users['users']['data'];
              this.cd.markForCheck();

            });
          console.log('reject')
        }
      })
    }
    else {
      this.loadAllUsers()
        .subscribe(users => {
          
          this.data = users['users']['data'];
          this.cd.markForCheck();

        });
    }
  }
  clear() {

    this.loadAllUsers()
      .subscribe(users => {
        if (users) {
          this.data = users['users']['data'];
          this.cd.markForCheck();
        }
      });

  }
  onRowUpdate(event) {
    setTimeout(() => {
      this.confirmationService.confirm({
        message: 'User ' + event.username,
        header: 'Edit',
        icon: null,
        accept: () => {
          
          this.userService.update(event)
            .subscribe((res) => {
              if (res) {
                
                this.messageService.add({ severity: 'success', summary: 'Edit', detail: 'UserName  ' + event.username + ' hasn been Edit' });

                //  this.data = res['users']['data'];
                //  this.cd.markForCheck();
              }
            }, (error) => {
              console.log(error);
            })

          console.log('accept')
        },
        reject: () => {
          this.loadAllUsers()
            .subscribe(users => {
              this.data = users['users']['data'];
              this.cd.markForCheck();

            });
          console.log('reject')
        }
      })
    }, 0)
  }

  changeEmail(data) {
    
  }
}
