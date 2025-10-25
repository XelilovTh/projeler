#include <iostream>
using namespace std;
int main(){
    int n;
    cout<<"say daxil edin :";
    cin>>n ;
    int a [n];
    for (int i =0 ; i<n ; i++){
        cin>>a[i];
    }
    int cem_tek=0;
    int cem_cut=0;
    for(int i =0 ; i<n ; i+=2 ){
        cem_cut+=a[i];
    }
    for(int i =1 ; i<n ; i+=2){
        cem_tek+=a[i];
    }
    cout<<"tek indekslerin cemi = "<<cem_tek<<endl<<"cut indekslerin cemi = "<<cem_cut<<endl;
    return 0 ;
}
