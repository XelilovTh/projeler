#include <iostream>
using namespace std;

int main(){
    int n ;
    int derece ;
    int s=0 , f =0 ;
    cout<<"selsi --> faranheit (1)"<<"   "<<"faranheit --> selsi (2)"<<endl<<"secim edin : ";
    cin>>n ;


    if(n==1){
        cout<<"derece daxil edin : ";
        cin>>derece;
        f=derece*9/5+32;
        cout<<f;
        return 0 ;
    }
    if(n==2){
        cout<<"derece daxil edin : ";
        cin>>derece;
        s=(derece-32)*5/9;
        cout<<s;
        return 0 ;
    }
    else{
        cout<<"sehv secim...";
        return 0 ;
    }
    return 0 ;
}
