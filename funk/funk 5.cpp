#include <iostream>
using namespace std;

int max(int aa[], int n) {
    int max = aa[0];
    for (int i = 1; i < n; i++) {
        if (aa[i] > max)
            max = aa[i];
    }
    return max;
}

int index(int aa[], int n, int value) {
    for (int i = 0; i < n; i++) {
        if (aa[i] == value)
            return i;
    }
    return -1;
}

int main() {

    int A[] = {3, 8, 2, 7, 5};
    int B[] = {4, 1, 9, 6, 2};
    int nA = 5, nB = 5;

    int maxA = max(A, nA);
    int maxB = max(B, nB);

    int indexA = index(A, nA, maxA);
    int indexB = index(B, nB, maxB);

    int c = A[indexA];
    A[indexA] = B[indexB];
    B[indexB] = c;

    cout << "A massivi: ";
    for (int x : A) cout << x << " ";

    cout <<endl<< "B massivi: ";
    for (int x : B) cout << x << " ";

    return 0;
}
