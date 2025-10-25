#include <iostream>
using namespace std;
int muk(int a ){
    bool c=false;
    int cem=0;
    for(int i=1 ; i<a ; i++){
        if(a%i==0){
            cem+=i;
        }
    }
    if(cem==a){
        c=true;
    }
    return c;
}
int main(){
    int a ;
    cout<<"eded daxil edin : " ;
    cin>>a;
    if(muk(a)==true){
        cout<<"mukemmel ededdir ";
    }
    else{
        cout<<"mukemmel eded deyil" ;
    }
    return 0 ;
}
