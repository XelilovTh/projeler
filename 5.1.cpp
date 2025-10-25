#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;
int main(){
    int n ;
    cout<<"say daxil edin :";
    cin>>n ;
    int a[n];
    for(int i =0 ; i<n ; i++){
        cout<<i+1<<"-ci eded : ";
       cin>>a[i];
    }

    //1.
    cout<<"ededler = ";
    for(int i =0 ; i<n ; i++){
        cout<<a[i]<<" ";
    }
    cout<<endl<<endl;

    //2.
    float cem=0 ;
    for(int i =0 ; i<n ; i++){
        cem+=a[i];
    }
    cout<<"cem = "<<cem<<endl<<endl;

    //3.
    cout<<"orta qiymet = "<<cem/n<<endl<<endl;

    //4,5.
    int max=a[0] , min=a[0];
    for(int i =0 ; i<n ; i++){
        if(a[i]>max){
            max=a[i];
        }
        if(a[i]<min){
            min=a[i];
        }
    }
    cout<<"max = "<<max<<endl<<"min = "<<min;
    cout<<endl<<endl;

    //6,7
    int cem1=0,cem2=0;
    for(int i =0 ; i<n ; i++){
        if(a[i]%2==0){
            cem1+=a[i];
        }
        if(a[i]%2==1){
            cem2+=a[i];
        }
    }
    cout<<"cut ededlerin cemi = "<<cem1<<endl<<"tek ededlerin cemi = "<<cem2;
    cout<<endl<<endl;

    //8.
    for(int i=n-1 ; i>=0 ; i--){
        cout<<a[i]<<" ";
    }
    cout<<endl<<endl;

    //9.
    for(int i =0 ; i<n ; i++){
        cout<<a[i]*a[i]<<" ";
    }
    cout<<endl<<endl;

    //10.
    cout<<"cutler = ";
    for(int i =0 ; i<n ; i++){
        if(a[i]%2==0){
            cout<<a[i]<<" ";
        }
    }
    cout<<endl;
    cout<<"tekler = ";
    for(int i =0 ; i<n ; i++){
        if(a[i]%2==1){
            cout<<a[i]<<" ";
        }
    }
    cout<<endl<<endl;

    //11.
    float cem3=0 ;
    for(int i =0 ; i<n ; i++){
        cem3+=a[i];
    }
    cout<<"cem = "<<cem<<"  ";
    cout<<"orta qiymet = "<<cem3/n<<endl<<endl;

    //12,
    cout<<"max - min = "<<max-min<<endl<<endl;

    //13,
    int cem4=0;
    for(int i =0 ; i<n ; i++){
        cem4+=abs(a[i]);
    }
    cout<<"cem = "<<cem4<<endl<<endl;

    //14.
    vector<int> b;
    for(int i=0 ; i<n-1 ; i++){
            b.push_back(a[i]+a[i+1]);
    }
    for(int x:b){
        cout<<x<<" ";
    }
    cout<<endl<<endl;

    //15.
    int say_c=0 , say_t=0;
    for(int i =0 ; i<n ; i++){
        if(a[i]%2==0){
            say_c++;
        }
        if(a[i]%2==1){
            say_t++;
        }

    }
    cout<<"cut sayi = "<<say_c<<"  "<<"tek sayi = "<<say_t<<endl<<endl;

    //16.
    cem=0;
    cout<<"cemin modulu = ";
    for(int i =0 ; i<n ; i++){
        cem+=a[i];
    }
    cout<<abs(cem)<<endl<<endl;

    //17.
 /*   cout<<"artan sira = ";
    sort(a, a+n);
    for(int i =0 ; i<n ; i++){
        cout<<a[i]<<" ";
    }
    cout<<endl<<endl;

    //18.
    cout<<"azalan sira = ";
    sort(a, a+n , greater<int>());
    for(int i =0 ; i<n ; i++){
        cout<<a[i]<<" ";
    }
    cout<<endl<<endl;
*/
    //19,20
    cout<<"ortalamanin ustunde olanlar = ";
    for(int i=0 ; i<n ; i++){
        if(a[i]>cem/n){
            cout<<a[i]<<" ";
        }
    }
    cout<<endl<<endl;

    //20.
    cout<<"ortalamanin altinda olanlar = ";
    for(int i=0 ; i<n ; i++){
        if(a[i]<cem/n){
            cout<<a[i]<<" ";
        }
    }
    cout<<endl<<endl;

    //21.



   //22.
   cem=0 ;
   int hasil=1 , ferq=a[0] ;
   for(int i =0 ; i<n ; i++){
       cem+=a[i];
       hasil*=a[i];
       ferq-=a[i];
   }
   cout<<"cem = "<<cem<<"  "<<"hasil = "<<hasil<<"  "<<"ferq = "<<ferq<<endl<<endl;

   //23.
   vector<int> e;
   for(int i=0 ; i<n ; i++){
       e.push_back(a[i]);
       e.push_back(a[i]);
   }
   for(int x : e){
    cout<<x<<" ";
   }
   cout<<endl<<endl;

   //24.
/*   for(int i =0 ; i<n ; i++){
        a[i]+=1;
        cout<<a[i]<<" ";
   }
   cout<<endl<<endl;*/

   //25.
/*   for(int i =0 ; i<n ; i++){
        a[i]*=2
        ;
        cout<<a[i]<<" ";
   }
   cout<<endl<<endl;*/

   //26.
   cout<<"cut indekslerdeki : ";
   for(int i=0 ; i<n ; i+=2){
        cout<<a[i]<<" ";
   }
   cout<<"tek indekslerdeki : ";
   for(int i =1 ; i<n ; i+=2){
    cout<<a[i]<<" " ;
   }
   cout<<endl <<endl;

   //27.
   int cem_1=0 , cem_2=0 ;
   for(int i=0 ; i<n/2 ; i++){
    cem_1+=a[i];
   }
   cout<<"ilk yarinin cemi = "<<cem_1<<endl;;
   for(int i =n/2 ; i<n ; i++){
       cem_2+=a[i];
   }
   cout<<"ikinci yarinin cemi = "<<cem_2;
   cout<<endl<<endl;

   //28.
   vector<int> f;
    for(int i=0 ; i<n-1 ; i++){
            f.push_back(a[i]-a[i+1]);
    }
    for(int x:f){
        cout<<x<<" ";
    }
    cout<<endl<<endl;

    //29.
    cout<<"kokleri = ";
    int c[n];
    for(int i =0 ; i<n ; i++){
        c[i]=sqrt(a[i]);
        cout<<c[i]<<" ";
    }
    cout<<endl<<endl;

    //30.
    cout<<"3-e bolunenler = ";
    for(int i =0 ; i<n ; i++){
        if(a[i]%3==0){
            cout<<a[i]<<" " ;
        }
    }
    cout<<endl<<endl;

    //31.
    cout<<"5-e bolunenler = ";
    for(int i =0 ; i<n ; i++){
        if(a[i]%5==0){
            cout<<a[i]<<" " ;
        }
    }
    cout<<endl<<endl;

    //32.
    max=a[0] , min=a[0];
    int max_i =0 , min_i =0 ;
    for(int i=0 ; i<n ; i++){
        if(a[i]>max){
            max_i+=1;
        }
        if(a[i]<min){
            min_i+=1;
        }
    }
    cout<<"max index = "<<max_i<<"  "<<"min index = "<<min_i<<endl<<endl;

    //33.
    cem=0;

    for(int i =0 ; i<n ; i++){
            cem+=a[i];
            cout<<cem<<" ";
    }
    cout<<endl<<endl;

    //34.
    cem=0;
    for(int i=0 ; i<n ; i++){
        cem+=abs(a[i]);
    }
    cout<<"modul ortalama = "<<cem/n<<endl<<endl;

    //35.
    int say=1;
    for(int i =0 ;i<n ; i++){
        if(a[i]==a[i+1]){
            say+=1;
        }

    }
    cout<<"tekrar sayi = "<<say<<endl<<endl;

    //36.


    //37.
    ferq=a[0];
    for(int i =1 ; i<n ; i++){
        ferq-=a[i];
    }
    cout<<"ferq = "<<ferq<<endl<<endl;

    //38.
    cem=0;
    cout<<"kvadratlar cemi = ";
    for(int i =0 ; i<n ; i++){
        cem+=a[i]*a[i];
    }
    cout<<cem<<endl<<endl;

    //39.
    cem_1=0 , cem_2=0;
    for(int i =0 ;i<n ; i+=2){
        cem_1+=a[i];
    }
    for(int i =1 ; i<n ; i+=2){
        cem_2+=a[i];
    }
    cout<<"cut index cemi = "<<cem_1<<"  "<<"tek indec cemi = "<<cem_2<<endl<<endl;

    //40.
    cem=0, cem1=0;
    for(int i =0; i<n ; i++){
        while(cem<=10){
            cem+=a[i];
        }
        cem1+=a[i];
    }

    cout<<cem1-cem<<"  "<<cem<<endl;
}
