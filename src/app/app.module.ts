import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	providers: [],
	entryComponents: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	
}
