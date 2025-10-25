#include <iostream>
using namespace std;

int ters( int a ){
    int rev=0 ;
    while( a>0 ){
        rev = rev*10+ a%10 ;
        a=a/10;
    }
    return rev;
}
int main (){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a;
    if( a==ters(a)){
        cout<<"polindromdur";
    }
    else{
        cout<<"polindrom deyil ";
    }
    return 0;
}
