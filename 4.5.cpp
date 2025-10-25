#include <iostream>
using namespace std;
int bolen(int a ){
    int say=0;
    for(int i=1 ; i<=a ; i++){
        if(a%i==0){
            say+=1;
        }
    }
    return say;
}
int main(){
    int a;
    cout<<"Eded daxil edin : ";
    cin>>a;
    cout<<"bolen sayi = "<<bolen(a);
    return 0 ;
}
