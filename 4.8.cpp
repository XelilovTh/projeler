#include <iostream>
#include <string>
using namespace std;
int bin(int a){
    int bin=0;
    while(a>0){
        bin=bin*10+a%2;
        a/=2;
    }
    return bin;
}
int ters(int a ){
    int ters=0 ;
    while(a>0){
        ters=ters*10+a%10;
        a/=10;
    }
    return ters;
}
string iki(int a ){
    string netice="";
    if(a==0){
        return "0";
    }
    while(a>0){
        netice=char('0'+(a%2))+netice;
        a/=2;
    }
    return netice;
}
int main(){
    int a ;
    cout<<"eded daxil edin : ";
    cin>>a ;
    cout<<ters(bin(a))<<endl;
    cout<<iki(a);
    return 0;
}
