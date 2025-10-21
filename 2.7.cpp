#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;

    cout << "Birinci ededi daxil edin: ";
    cin >> a;
    cout << "Emeliyyati daxil edin (+, -, *, /): ";
    cin >> op;
    cout << "Ikinci ededi daxil edin: ";
    cin >> b;

    switch (op) {
        case '+':
            cout << "Netice: " << a + b;
            break;
        case '-':
            cout << "Netice: " << a - b;
            break;
        case '*':
            cout << "Netice: " << a * b;
            break;
        case '/':
            if (b != 0)
                cout << "Netice: " << a / b;
            else
                cout << "Sifira bolmek olmaz!";
            break;
        default:
            cout << "Yanlis emeliyyat daxil edildi!";
    }

    return 0;
}
