#include <iostream>
#include <string>
using namespace std;
string bal(int a ){
    string bal;
    if(a>=0&&a<=50){
        bal="F";
    }
    if(a>50&&a<=60){
        bal="E";
    }
    if(a>60&&a<=70){
        bal="D";
    }
    if(a>70&&a<=80){
        bal="C";
    }
    if(a>80&&a<=90){
        bal="B";
    }
    if(a>90&&a<=100){
        bal="A";
    }
    if(a>100){
        cout<<"duzgun bal daxil edin : ";
    }
    return bal;
}
int main(){
    cout<<"bal daxil edin: ";
    int a;
    cin>>a  ;
    cout<<bal(a);
    return 0;
}
