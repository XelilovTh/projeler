#include <iostream>
using namespace std;
int cem(int a ){
    int cem=0;
    while(a>0){
        cem+=a%10;
        a/=10;
    }
    return cem;
}
int main(){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a ;
    cout<<cem(a);
    return 0 ;
}
