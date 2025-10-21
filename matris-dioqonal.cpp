#include <iostream>
using namespace std;

int main(){
    
    int a;
    cout<<"setir ve sutun daxil edin : ";
    cin>>a ;
    int d[a][a];
    
    int cem =0;
    int cem1=0;
    
    for(int i=0 ; i<a ; i++){
        for(int j=0 ; j<a ; j++){
            cout<<i+1<<"-ci setir "<<j+1<<"-ci sutun ";
            cin>>d[i][j];
        }
    }
    
    for(int i =0 ; i<a ; i++){
        for(int j =0 ; j<a ; j++){
            if(i+j==a-1){
                cem=cem+d[i][j];
            }
        }
    }
    
    for(int i=0 ; i<a ; i++){
        cem1=cem1+d[i][i];
    }
    cout<<"dioqonalin cemi = "<<cem1<<endl;
    cout<<"ters dioqonalin cemi = "<<cem;
    return 0 ;
}
