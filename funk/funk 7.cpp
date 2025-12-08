#include <iostream>
using namespace std;

int funk(int X[], int Y[], int n) {
    for (int i = 0; i < n; i++) {
        if (X[i] == Y[i] * Y[i]) {
            return i;
        }
    }
    return -1;
}

int main() {

    int X[5] = {4, 7, 9, 20, 16};
    int Y[5] = {2, 3, 3, 4, 5};

    int index = funk(X, Y, 5);

    if (index != -1)
        cout << "serti odeyen element: X[" << index << "] = " << X[index];
    else
        cout << "sert odenmir ";

    return 0;
}
