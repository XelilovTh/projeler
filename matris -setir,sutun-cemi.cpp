#include <iostream>
using namespace std;

int main(){
    
    int a , b ;
    cout<<"setir : ";
    cin>>a ;
    cout<<"sutun : ";
    cin>>b;
    int d[a][b];
    for( int i = 0 ; i<a ; i++){
        for(int j = 0 ; j<b ; j++){
            cout<<i+1<<"-ci setir "<<j+1<<"-ci sutun: ";
            cin>>d[i][j];
        }
    }
    for( int j = 0 ; j<b ; j++){
        int max=d[0][j];
        int min=d[0][j];
        for(int i = 0 ; i<a ; i++){
            if(d[i][j]>max){
                max=d[i][j];
            }
            if(d[i][j]<min){
                min=d[i][j];
            }
        }
        cout<<j+1<<"-ci sutunda max eded : "<<max<<endl;
        cout<<j+1<<"-ci sutunda min eded : "<<min<<endl;
    }
    for(int i =0 ; i<a ; i++){
        int max=d[i][0];
        int min=d[i][0];
        for(int j =0 ; j<b ; j++){
            if(d[i][j]>max){
                max=d[i][j];
            }
            if(d[i][j]<min){
                min=d[i][j];
            }
        }
        cout<<i+1<<"-ci setirde max eded : "<<max<<endl;
        cout<<i+1<<"-ci setirde min eded : "<<min<<endl;
    }
    return 0;
}