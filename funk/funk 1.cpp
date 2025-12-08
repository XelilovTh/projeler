#include <iostream>
using namespace std;

int az(int aa[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (aa[j] < aa[j + 1]) {
                int d = aa[j];
                aa[j] = aa[j + 1];
                aa[j + 1] = d;
            }
        }
    }
    return 0;
}

int main() {
    int aa[] = {5, 2, 9, 1, 7};
    int n = 5;

    az(aa, n);

    cout << "azalan sira : ";
    for (int i = 0; i < n; i++) {
        cout << aa[i] << " ";
    }

    return 0;
}
