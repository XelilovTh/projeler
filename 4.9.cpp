#include <iostream>
using namespace std;
int ters(int a ){
    int ters=0 ;
    while(a>0){
       ters=ters*10+a%10;
       a/=10;
       }
       return ters;
}
int main(){
    for(int i=1 ; i<=1000 ; i++){
       if(i==ters(i)){
            cout<<i<<" ";
       }
    }
    return 0 ;
}
