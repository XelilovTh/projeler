#include <iostream>
using namespace std;
int boyuk(int a , int b , int c ){
    if(a>=b&&a>=c){
        cout<<a;
    }
    else if(b>=a&&b>=c){
        cout<<b;
    }
    else{
        cout<<c;
    }
}
int main(){
    int a, b, c  ;
    cout<<"ededleri daxil edin : ";
    cin>>a>>b>>c ;
    cout<<boyuk(a,b,c);
    return 0 ;
}

