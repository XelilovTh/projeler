#include <iostream>
using namespace std;

int main(){
    int n ;
    cout<<"eded daxil edin : ";
    cin>>n ;

    cout<<n<<"-den kicik : ";

    for(int i=2 ; i<n ; i++){
        bool sade =true ;
        for(int j=2 ; j<i ; j++){
            if(i%j==0){
                sade=false;
                break;
            }
        }
        if(sade){
            cout<<i<<" ";
        }
    }
    return 0 ;
}
