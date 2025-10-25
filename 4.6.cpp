#include <iostream>
using namespace std;
int main(){
    int n, maks , mini , cem=0;

    cout<<"say daxil edin : ";
    cin>>n ;
    int a[n];

    for(int i=1 ; i<=n ; i++){
        cin>>a[i];
    }
    maks=a[0];
    mini=a[1];
    for(int i =1 ; i<=n ; i++){
        if(a[i]>maks){
            maks=a[i];
        }
        if(a[i]<mini){
            mini=a[i];
        }
        cem+=a[i];
    }
    cout<<"max : "<<maks<<endl<<"min : "<<mini<<endl<<"ortalama : "<<cem/n<<endl;
    return 0 ;
}
