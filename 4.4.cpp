#include <iostream>
using namespace std;
int cem(int a ){
    int cem=0 ;
    while(a>0){
        cem=cem+a%10;
        a/=10;
    }
    return cem;
}
int main(){
    for(int i=100 ; i<1000 ; i++){
        if(cem(i)==10){
            cout<<i<<" ";
        }
    }
    return 0 ;
}
