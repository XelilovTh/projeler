#include <iostream>
using namespace std;

int cem(int aa[], int n, int b, int c) {
    int cem = 0;

    for (int i = 0; i < n; i++) {
        if (aa[i] > b && aa[i] < c) { 
            cem += aa[i];
        }
    }

    return cem;
}

int main() {
    int A[10] = {5, 12, 3, 8, 20, 7, 15, 1, 9, 11};
    int b, c;

    cout << "b daxil edin: ";
    cin >> b;

    cout << "c daxil edin: ";
    cin >> c;

    int d = cem(A, 10, b, c);

    cout << "b < A[i] < c olan elementlerin cemi: " << d;

    return 0;
}
