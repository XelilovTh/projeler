#include <iostream>
using namespace std;
int main(){
    int saniye,saat , deqiqe , qaliq ;
    cout<<"saniye daxil edin : ";
    cin>>saniye;
    saat=saniye/3600;
    qaliq=saniye%3600;
    deqiqe=qaliq/60;
    cout<<"saat = "<<saat<<" deqiqe = "<<deqiqe<<endl;
    return 0 ;
}
