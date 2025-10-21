#include <iostream>
using namespace std;

int ebob( int a , int b ){
    while ( b!=0 ){
        int qaliq = a%b ; 
        a=b ;
        b=qaliq ; 
    }
    return a ; 
}
int main (){
    cout<<" iki eded daxil edin : " ;
    int a , b ;
    cin>>a>>b ;
    cout<<" EKOB( a , b ) = "<<a*b/(ebob(a,b));
    return 0;
}