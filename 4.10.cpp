#include <iostream>
using namespace std;

int main() {
    double netice = 0;
    double a;
    char op;

    cout << "Ilk ededi daxil edin: ";
    cin >> netice;

    while (true) {
        cout << "Operator(bitirmek ucun = ): ";
        cin >> op;

        if(op == '=') break;

        cin >> a;

        if(op == '+') netice += a;
        else if(op == '-') netice -= a;
        else if(op == '*') netice *= a;
        else if(op == '/') {
            if(a != 0) netice /= a;
            else {
                cout << "Xeta: 0-a bolme!" << endl;
                continue;
            }
        } else {
            cout << "Sehv operator!" << endl;
        }
    }

    cout << "Netice: " << netice << endl;

    return 0;
}
