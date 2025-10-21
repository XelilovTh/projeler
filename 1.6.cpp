#include <iostream>
using namespace std;
float orta(float a ,float b ,float c ){
    float orta=(a+b+c)/3;
    return orta ;
}
int main(){
    float a, b , c ;
    cin>>a>>b>>c;
    cout<<"ededi orta = "<<orta(a ,b , c );
    return 0 ;
}
