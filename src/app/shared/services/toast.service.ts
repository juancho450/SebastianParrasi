import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOAST_STATE } from '../constants/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {  
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');  
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.success);  

  constructor() { }  

  showToast(toastState: string, toastMsg: string): void {  
    this.toastState$.next(toastState);    
    this.toastMessage$.next(toastMsg);    
    this.showsToast$.next(true);   

    this.dismissToast(2000)
  }  

  dismissToast(duration: number): void {   
    setTimeout(() => {
      this.showsToast$.next(false);  
    }, duration); 
   
  }
}