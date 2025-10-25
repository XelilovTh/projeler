#include <iostream>
using namespace std;
int say(int a){
    int say=0 ;
    while(a>0){
        say=say+1;
        a=a/10;
    }
    return say;
}
int main(){
    int a;
    cout<<"eded daxil edin : ";
    cin>>a ;
    cout<<"say = "<<say(a);
    return 0 ;
}
