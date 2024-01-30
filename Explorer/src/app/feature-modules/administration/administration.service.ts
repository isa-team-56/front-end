import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Person } from './model/userprofile.model';
import { User, UserInfo } from 'src/app/infrastructure/auth/model/user.model';
import { UserNotification } from 'src/app/infrastructure/auth/model/user.model';
import { Company } from './model/company.model';


@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  
  
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<PagedResults<Company>> {
    return this.http.get<PagedResults<Company>>(environment.apiHost + 'company')
  }
  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'equipment')
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(environment.apiHost + 'equipment/' + id);
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(environment.apiHost + 'equipment', equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(environment.apiHost + 'equipment/' + equipment.id, equipment);
  }

  //Profile, Administration

  getUser(id: number): Observable<Person>{
    return this.http.get<Person>(environment.apiHost + 'userprofile/' + id);
  }

  updateUser(profile: Person): Observable<Person> {
    return this.http.put<Person>(environment.apiHost + 'userprofile/updateUser/' + profile.id, profile);
  }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(environment.apiHost + 'administration/users/getAll');
  }
  
  blockUser(username: string): Observable<UserInfo> {
    const url = `${environment.apiHost}administration/users/block-user?username=` + username;
    return this.http.post<UserInfo>(url, {});
  }
  
  getUserFollowers(id: number): Observable<PagedResults<User>> {
    return this.http.get<PagedResults<User>>(environment.apiHost + 'userprofile/followers/' + id);
  }

  getUsersToFollow(): Observable<PagedResults<User>> {
    return this.http.get<PagedResults<User>>(environment.apiHost + 'userprofile/allUsers');
  }

  followUser(userId: number, userToFollowId: number) {
    return this.http.patch<User>(environment.apiHost + 'userprofile/followers/' + userId + '/follow/' + userToFollowId, {});
  }

  unfollowUser(userId: number, userToUnfollowId: number) {
    return this.http.patch<User>(environment.apiHost + 'userprofile/followers/' + userId + '/unfollow/' + userToUnfollowId, {});
  }

  canUserUseBlog(userId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'userprofile/canUserUseBlog/' + userId);
  }



  //Notifications
  getUserNotifications(userId: number): Observable<PagedResults<User>> {
    return this.http.get<PagedResults<User>>(environment.apiHost + 'notifications/' + userId);
  }

  markAsReadNotification(userId: number, notificationId: number | undefined){
    return this.http.patch<User>(environment.apiHost + 'notifications/user/' + userId + '/status/' + notificationId, {});
  }

  sendNotificationToFollowers(notification: UserNotification){
    return this.http.patch<User>(environment.apiHost + 'notifications', notification);
  }

  notifyUser(receiverId: number, notification: UserNotification){
    return this.http.patch<User>(environment.apiHost + 'notifications/' + receiverId, notification);
  }

  removeNotification(userId: number, notificationId: number | undefined){
    return this.http.patch<User>(environment.apiHost + 'notifications/user/' + userId + '/delete/' + notificationId, {})
  }


  setDeadlineForProblem(problemId: number, newDeadline: Date): Observable<any> {
    const url = `${environment.apiHost}administration/problems/set-deadline/${problemId}`;
    const requestBody = newDeadline.toISOString(); // Samo vrednost datuma
    return this.http.patch(url, `"${requestBody}"`, { headers: { 'Content-Type': 'application/json' } }).pipe(
     
    );
  }
  
  getCompaniesByEquipment(equipment: Equipment): Observable<Company> {
    return this.http.put<Company>(environment.apiHost + 'company/getCompaniesByEquipment', equipment);
  }
 


}
