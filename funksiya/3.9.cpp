#include <iostream>
using namespace std;
bool sade (int a ){
    bool eded=true;
    if(a<2){
        cout<<"ne sadedir ne murekkeb...";
        return 0 ;
    }
    for(int i =2 ; i<a ; i++){
        if(a%i==0){
            eded=false;
            break;
        }
    }
    return eded ;
}
int main(){
    int a ;
    cin>>a ;
    if(sade(a)){
        cout<<"sadedir";
    }
    else{
        cout<<"sade deyil";
    }
    return 0 ;
}
