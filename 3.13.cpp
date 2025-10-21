#include <iostream>
using namespace std;
int ters(int a ){
    int ters =0 ;
    while(a>0){
        ters=ters*10+a%10;
        a/=10;
    }
    return ters;
}
int main(){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a;
    cout<<"ters = "<<ters(a)<<endl;
    if(a==ters(a)){
        cout<<"polindromdur";
    }
    else {
        cout<<"polindrom deyil";
    }
    return 0;
}
