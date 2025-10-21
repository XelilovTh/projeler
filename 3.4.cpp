#include <iostream>
using namespace std;
int main(){
    int eded;
    int hasil=1;
    cout<<"eded daxil edin ";
    cin>>eded;

    int i=1;
    for(int i=1 ; i<=eded ; i++){
        hasil=hasil*i;
    }

    cout<<"faktorial = ";
    cout<<hasil;
    return 0;
}
