#include <iostream>
using namespace std;
int ters(int a){
    int ters=0;
    while(a>0){
        ters=ters*10+a%10;
        a/=10;
    }
    return ters;
}
int main(){
    int a ;
    cin>>a ;
    cout<<ters(a);
    return 0 ;
}
