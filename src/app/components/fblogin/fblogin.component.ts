import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { environment } from 'src/app/environments';

interface AnalyticsData {
  name: string;
  period: string;
  values: { value: any, end_time: any }[];
  title: string;
  description: string;
}

@Component({
  selector: 'app-fblogin',
  templateUrl: './fblogin.component.html',
  styleUrls: ['./fblogin.component.css']
})
export class FBloginComponent {
  url = 'https://graph.facebook.com/v18.0/2344574695601102/insights/page_impressions,page_engaged_users?access_token=EAAPBNW6NqRsBO2UfJm3z5WnixOtoyDhTLzcHC8zDTonzxK5LiHMRMjaPBHdqC62XmxeXYj5QIsPRbkCbazq7NXBbNqVhhVPWp3ANKa1ZAXdXEpIt48mJ4hJKSU9brZCWeb0YyOdChEZBTmsEyK6UZA2GypbHPcHUPTMAjfWvSNfycWZCZBN4EwnRfZAZAGTZBMYPU'
  private supabase: SupabaseClient

  constructor(private router: Router, private fb: FacebookService) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  ngOnInit() {
    debugger;
    // Initialize Facebook SDK
    const initParams: InitParams = {
      appId: '1056860162337051',
      cookie: true,
      xfbml: true,
      version: 'v18.0'
    };
    this.fb.init(initParams);
  }

  onFacebookLoginClick() {
    debugger;
    this.fb.login({ scope: 'public_profile,email' });
    //   .then((response: LoginResponse) => {
    //     if (response.authResponse) {
          this.getUserInfo();
          this.fetchDataFromFacebook();
      //   } else {
      //     // Handle login failure
      //     console.log('Facebook login failed');
      //   }
      // })
      // .catch((error: any) => console.error(error));
  }

  getUserInfo() {
    debugger;
    this.fb.api('/me?fields=name,email')
      .then((response: any) => {
        console.log('Successful login for: ', response.name);
        // Handle user info
        const statusElement = document.getElementById('status');
        if (statusElement) {
          statusElement.innerHTML = `Thanks for logging in, ${response.name}!`;
        }
      })
      .catch((error: any) => console.error(error));
  }
  
  // This new long-lived access token will expire on January 14, 2024
  async fetchDataFromFacebook() {
    try {
      debugger;
      const response = await axios.get(this.url);
      const dataFromFacebook: AnalyticsData[] = response.data.data || []; // Extracting the 'data' array
      console.log(dataFromFacebook);

      this.saveDataToSupabase(dataFromFacebook);
    } catch (error: any) {
      console.error('Error fetching or updating data:', error.message);
    }
  }

  async saveDataToSupabase(dataFromFacebook: AnalyticsData[]) {
    try {
      const formattedData = dataFromFacebook.map(item => ({
        name: item.name,
        period: item.period,
        title: item.title,
        description: item.description,
        ...convertValuesArrayToColumns(item.values), //spread operator-- Spread the converted values array
      }));

      const { data: dataUpsert, error: errorUpsert } = await this.supabase.from('analytics').upsert(formattedData);
      if (errorUpsert) {
        console.error('Error saving data to Supabase:', errorUpsert.message);
      } else {
        console.log('Data saved successfully in analytics table:', dataUpsert);
        this.router.navigate(['/superset']);
      }
    } catch (error: any) {
      console.error('Error saving data to Supabase:', error.message);
    }
  }
}

// Helper function to convert values array to columns
function convertValuesArrayToColumns(valuesArray: { value: any; end_time: any }[]): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  valuesArray.forEach((valueItem, index) => {
    result[`value${index + 1}`] = valueItem.value;
    result[`end_time${index + 1}`] = valueItem.end_time;
  });

  return result;

}
