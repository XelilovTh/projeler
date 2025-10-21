#include <iostream>
using namespace std;

int main(){
    int a;
    cout<<"setir sayi: ";
    cin>>a;
    int b;
    cout<<"sutun sayi: ";
    cin>>b ; 
    int c[a][b];
    for(int i=0 ;i<a ; i++){
        for(int j=0 ; j<b ; j++){
            cout<<i+1<<"-ci setir "<<j+1<<"-ci sutun : ";
            cin>>c[i][j];
        }
    }
    int t,r , s;
    int cem=0;
    cout<<"setir(1) yoxsa sutun(2) toplamaq isteyirsiz? ";
    cin>>t;
    if(t==1){
        cout<<"toplamaq istediyiniz setir nomresi: ";
        cin>>r;
        if(r>a){ 
            cout<<"duzgun say daxil edin...";
            return 0 ; 
        }
        for(int j=0 ; j<b ; j++){
            cem=cem+c[r-1][j];
        }
        cout<<cem;
        return 0;
    }
    if(t==2){
        cout<<"toplamaq istediyiniz sutun nomresi: ";
        cin>>s;
        if(s>b){
            cout<<" duzgun say daxil edin... ";
            return 0 ;
        }
        for(int i=0 ; i<a ; i++){
            cem=cem+c[i][s-1];
        }
        cout<<cem;
        return 0;
    }
    
    return 0 ;
}