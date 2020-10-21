import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { UserService, AuthenticationService } from '@/_services';
import { first } from 'rxjs/operators';
import { User } from '@/_models';

@Component(
    { 
        selector: 'audit', templateUrl: 'audit.component.html'
    })

export class AuditComponent implements OnInit {

    users = [];
    displayedColumns: string[] = ['username', 'role', 'loginTime', 'logOutTime', 'dbutton'];
    dataSource = new MatTableDataSource<User>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private userService: UserService,
        private authenticationService: AuthenticationService){

    }
    
    ngOnInit() {
        this.loadAllUsers();
        
    }

    private loadAllUsers() {
        this.userService.getAllById(this.authenticationService.currentUserValue.id)
        .pipe()
        .subscribe({
            next:users => {
                this.users = users,console.log(users),
                this.dataSource = new MatTableDataSource<User>(users);
                this.dataSource.paginator = this.paginator;
            },
            error: err =>{
                console.log(err);
            }
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

}