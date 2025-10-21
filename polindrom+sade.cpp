#include <iostream>
using namespace std ;
int ters( int a ){
    int rev=0;
    while( a>0 ){
        rev=rev*10+a%10;
        a=a/10;
    }
    return rev;
}

bool sade ( int n){
    if ( n<2 )return false ;
    for ( int i = 2 ; i<n ; i++ ){
        if( n%i==0 ){
            return false;
        }
    }
    return true ;
}
int main (){
        for (int x = 1; x <= 1000; x++) {
        if (x == ters(x) && sade(x)) { 
            cout << x << " ";
        }
    }
    return 0;
}