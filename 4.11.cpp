#include <iostream>
using namespace std;
int main(){
    int a=0 , b=1 , c=0;
    while(a<=1000){
        cout<<a<<" ";
        c=a+b;
        a=b ;
        b=c;
    }
    return 0;
}
