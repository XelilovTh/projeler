#include <iostream>
using namespace std;
int boyuk(int a , int b ){
    if(a>b){
        cout<<a ;
    }
    else{
        cout<<b ;
    }
}
int main(){
    int a , b ;
    cout<<"iki eded daxil edin: ";
    cin>>a>>b;
    cout<<"boyuk eded = "<<boyuk(a,b);
    return 0 ;
}
