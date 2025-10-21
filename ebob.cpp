#include <iostream>
using namespace std;

int main (){
    for( int i = 2 ; i<=1000 ; i++){
        for( int x = 1 ; x<i ; x++ ){
            if(i%x==0){
                return 0;
            }
        }
    }
}