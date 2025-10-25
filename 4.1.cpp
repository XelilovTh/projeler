#include <iostream>
using namespace std;
int main(){
    int a,cem ;
    cin>>a;
    for(int i=1 ; i<=a ; i++){
        if(i%2==0){
            cem=cem+i*i;
        }
    }
    cout<<cem;
}
