#include <iostream>
using namespace std;

int main(){
    
    int a , b;
    cout<<"birinci massivin setir sayi : ";
    cin>>a ; 
    cout<<"birinci massivin sutun sayi : ";
    cin>>b ; 
    int d[a][b];
    
    int c , e;
    cout<<"ikinci massivin setir sayi : ";
    cin>>c ; 
    cout<<"ikinci massivin sutun sayi : ";
    cin>>e ; 
    int f[c][e];
    
    if(b!=c){
        cout<<"bu matrisleri vurmaq olmaz.";
        return 0; 
    }
    
    int g[a][e];
    
    for( int i=0; i<a ; i++){
        for(int j=0; j<b;j++){
            cin>>d[i][j];
        }
    }
    
    for( int i=0; i<c ; i++){
        for(int j=0; j<e;j++){
            cin>>f[i][j];
        }
    }
    
    for(int i =0; i<a ; i++){
        for(int j=0; j<e ; j++){
            g[i][j]=0;
            for(int k=0 ; k<b ; k++){
                g[i][j]+=d[i][k]*f[k][j];
            }
        }
    }
    for(int i=0; i<a ; i++){
        for(int j=0;j<e;j++){
            cout<<g[i][j]<<" ";
        }
        cout<<endl;
    }
    return 0;
    
}