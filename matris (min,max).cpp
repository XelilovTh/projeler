#include <iostream>
using namespace std;

int main(){
    int a ,b ;
    cout<<"setir : ";
    cin>>a; 
    cout<<"sutun : ";
    cin>>b ; 
    int d [a][b];
    
    for(int i=0 ; i<a ; i++){
        for( int j = 0 ; j<b; j++){
            cout<<i+1<<"-ci setir "<<j+1<<"-ci sutun : ";
            cin>>d[i][j];
        }
    }
    
    int min=d[0][0];
    int max=d[0][0];
    int min_i=0 , min_j=0 , max_i=0 , max_j=0 ;
    
    for(int i =0 ; i<a ; i++){
        for(int j = 0 ; j<b ; j++){
            if(d[i][j]>max){
                max=d[i][j];
                max_i=i;
                max_j=j;
            }
            if(d[i][j]<min){
                min=d[i][j];
                min_i=i;
                min_j=j;
            }
        }
    }
    
    cout<<"max: "<<max<<" yeri: "<<max_i+1<<"-ci setir "<<max_j+1<<"-ci sutun "<<endl;
    cout<<"min: "<<min<<" yeri: "<<min_i+1<<"-ci setir "<<min_j+1<<"-ci sutun "<<endl;

    return 0 ;
}