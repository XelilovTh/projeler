#include <iostream>
#include <vector>
using namespace std;
int main(){
    int a=1;
    int max=1;
    while(a!=0){
        cin>>a;
        if(a>max){
            max=a;
        }
    }
    cout<<max;
    return 0;
}
