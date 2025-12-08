#include <iostream>
#include <cmath>
using namespace std;


double e_orta(int aa[], int n) {
    int cem = 0;
    for (int i = 0; i < n/2; i++) {
        cem += aa[i];
    }
    return (double)cem / (n/2);
}

double h_orta(int aa[], int n) {
    double hasil = 1;
    for (int i = n/2; i < n; i++) {
        hasil *= aa[i];
    }
    return pow(hasil, 1.0 / (n/2));
}

int main() {

    int arr[20] = {2,4,6,8,10,12,14,16,18,20,
                   1,2,3,2,2,1,3,2,1,2};

    double a = e_orta(arr, 20);
    double b = h_orta(arr, 20);

    cout << "Ilk yarinin ededi ortasi: " << a << endl;
    cout << "Son yarinin hendesi ortasi: " << b << endl;

    return 0;
}
