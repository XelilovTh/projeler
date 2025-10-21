#include <iostream>
using namespace std;

int main() {
    int ay;
    cout << "Ay nomresini daxil edin (1-12): ";
    cin >> ay;

    if (ay == 12 || ay == 1 || ay == 2) {
        cout << "Qis feslidir ";
    }
    else if (ay >= 3 && ay <= 5) {
        cout << "Yaz feslidir ";
    }
    else if (ay >= 6 && ay <= 8) {
        cout << "Yay feslidir ";
    }
    else if (ay >= 9 && ay <= 11) {
        cout << "Payiz feslidir ";
    }
    else {
        cout << "Daxil edilen ay nomresi yanlisdir!";
    }

    return 0;
}
