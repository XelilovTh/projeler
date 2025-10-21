#include <iostream>
using namespace std;
int main(){
    int cem=0 , n , a;
    cout<<"eded sayi : ";
    cin>>n;
    for(int i=1 ; i<=n ; i++){
        cin>>a;
        cem+=a;
    }
    cout<<"cem = "<<cem;
    return 0 ;
}
