#include <iostream>
using namespace std;
int arm(int a ){
    int arm=0 ;
    while(a>0){
        arm=arm+(a%10)*(a%10);
        a/=10;
    }s
    return arm;
}
int main(){
    int a ;
    cout<<"Eded daxil edin : ";
    cin>>a ;
    if(a==arm(a)){
        cout<<"armstrongdur";
    }
    else{
        cout<<"armstrong deyil ";
    }
    return 0 ;
}
