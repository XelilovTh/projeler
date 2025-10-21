#include <iostream>
using namespace std;
int main(){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a ;
    for(int i = 2 ; i<=a ; i++){
        if(a%i==0){
            cout<<i<<" ";
        }
    }
    return 0 ;
}
