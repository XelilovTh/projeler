#include <iostream>
using namespace std;
int eded(int a){
    if(a==0){
        cout<<"ne tekdir ne cutdur"<<endl;
        return 0 ;
    }
    if(a%2==0){
        cout<<"cutdur";
    }
    else if(a%2==1){
        cout<<"tekdir";
    }
}
int main(){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a ;
    cout<<eded(a);
    return 0 ;
}
