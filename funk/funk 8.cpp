#include <iostream>
#include <cmath>
using namespace std;

double e_orta(int aa[], int n) {
    int maks = aa[0];
    int min = aa[0];

    for (int i = 1; i < n; i++) {
        if (aa[i] > maks) maks = aa[i];
        if (aa[i] < min) min = aa[i];
    }

    return (double)(maks + min) / 2;
}

double h_orta(int aa[], int n) {
    int maks = aa[0];
    int min = aa[0];

    for (int i = 1; i < n; i++) {
        if (aa[i] > maks) maks = aa[i];
        if (aa[i] < min) min = aa[i];
    }

    return sqrt((double)maks * min);
}

int main() {
    int A[25] = {12, 7, 9, 4, 15, 20, 1, 8, 6, 11,
                  5, 3, 2, 14, 16, 18, 13, 10, 17, 19,
                  21, 22, 23, 24, 25};

    double ededi = e_orta(A, 25);
    double hendesi = h_orta(A, 25);

    cout << "ededi ortasi: " << ededi << endl;
    cout << "hendesi ortasi: " << hendesi << endl;

    return 0;
}
