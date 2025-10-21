#include <iostream>
using namespace std;
int kvd(int a){
    a*=a;
    return a ;
}
int kub(int a ){
    a*=kvd(a);
    return a  ;
}
int main(){
    cout<<"ededn daxil edin: ";
    int a ;
    cin>>a ;
    cout<<kvd(a)<<endl<<kub(a);
    return 0 ;
}
