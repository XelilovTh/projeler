#include <iostream>
using namespace std;

int musbet(int aa[], int n) {

    int min = -1;

    for (int i = 0; i < n; i++) {

        if (aa[i] > 0) {

            if (min == -1 || aa[i] < min) {
                min = aa[i];
            }
        }
    }

    return min;
}

int main() {

    int aa[] = {11, 0, -3, 2, 4, -6, 3, -2};
    int n = 8;

    int b =musbet(aa, n);

    cout << "En kicik musbet eded: " << b;

    return 0;
}
