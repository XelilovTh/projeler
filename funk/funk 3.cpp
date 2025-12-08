#include <iostream>
using namespace std;

int mesafe(int aa[], int n) {

    int ilk = -1;
    int son = -1;

    for (int i = 0; i < n; i++) {
        if (aa[i] == 0) {
            if (ilk == -1) {
                ilk = i;  
            }
            son = i; 
        }
    }
    if (ilk == -1 || son == -1)
        return -1;

    return son - ilk;
}

int main() {

    int aa[] = {5, 0, -3, 8, 0, 2, 0, 7};
    int n = 8;

    int b = mesafe(aa, n);

    cout << "Mesafe: " << b;

    return 0;
}
