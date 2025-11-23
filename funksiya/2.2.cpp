#include <iostream>
using namespace std;
int eded(int a){
    if(a>0){
        cout<<"musbetdir";
    }
    else if(a<0){
        cout<<"menfidir";
    }
    else{
        cout<<"sifirdir";
    }
}
int main(){
    int a ;
    cout<<"eded daxil edin: ";
    cin>>a ;
    cout<<eded(a);
        return 0 ;
}
