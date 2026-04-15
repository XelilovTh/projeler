using System;
using System.Collections.Generic;

namespace TapsiriqLayihe
{
    class Mehsul
    {
        private string _adi;
        private string _novu;
        private double _deyeri;
        private DateTime _bitmeTarixi;

        public string Adi
        {
            get { return _adi; }
            set { _adi = value; }
        }

        public string Novu
        {
            get { return _novu; }
            set { _novu = value; }
        }

        public double Deyeri
        {
            get { return _deyeri; }
            set { _deyeri = value; }
        }

        public DateTime BitmeTarixi
        {
            get { return _bitmeTarixi; }
            set { _bitmeTarixi = value; }
        }

        public Mehsul(string ad, string nov, double deyer, DateTime bitme)
        {
            _adi = ad;
            _novu = nov;
            _deyeri = deyer;
            _bitmeTarixi = bitme;
        }

        public void EkranaYazdir()
        {
            Console.WriteLine($"Mehsul: {_adi} | Bolme: {_novu} | Qiymet: {_deyeri} AZN | Bitme: {_bitmeTarixi.ToShortDateString()}");
        }

        public bool KecerlilikMuddetiBitib()
        {
            return DateTime.Now > _bitmeTarixi;
        }
    }

    class Program
    {
        static bool Movcuddurmu(List<Mehsul> siyahi, Mehsul axtarilan)
        {
            foreach (Mehsul element in siyahi)
            {
                if (element == axtarilan)
                {
                    return true;
                }
            }
            return false;
        }

        static List<Mehsul> NoveGoreSec(List<Mehsul> esasSiyahi, string hedefNov)
        {
            List<Mehsul> secilmisler = new List<Mehsul>();
            foreach (Mehsul m in esasSiyahi)
            {
                if (m.Novu == hedefNov)
                {
                    secilmisler.Add(m);
                }
            }
            return secilmisler;
        }

        static void Main(string[] args)
        {
            Mehsul m1 = new Mehsul("Sud", "Süd mehsullari", 2.20, new DateTime(2026, 6, 1));
            Mehsul m2 = new Mehsul("Pendir", "Süd mehsullari", 5.40, new DateTime(2026, 3, 15));
            Mehsul m3 = new Mehsul("Corek", "Un mehsullari", 0.60, new DateTime(2026, 4, 10));

            List<Mehsul> anbar = new List<Mehsul>();
            anbar.Add(m1);
            anbar.Add(m2);
            anbar.Add(m3);

            Console.WriteLine("=== Anbardaki Butun Mehsullar ===");
            foreach (Mehsul item in anbar)
            {
                item.EkranaYazdir();
            }

            bool axtarisNeticesi = Movcuddurmu(anbar, m1);
            Console.WriteLine($"\nSiyahida m1 adli obyekt movcuddurmu?: {axtarisNeticesi}");

            Console.WriteLine("\n=== Filtr: Sadece Süd mehsullari ===");
            List<Mehsul> suresi = NoveGoreSec(anbar, "Süd mehsullari");
            foreach (Mehsul s in suresi)
            {
                s.EkranaYazdir();
            }

            int index = 0;
            while (index < anbar.Count)
            {
                if (anbar[index].KecerlilikMuddetiBitib())
                {
                    anbar.RemoveAt(index);
                }
                else
                {
                    index++;
                }
            }

            Console.WriteLine("\n=== Vaxti Kecenler Silindi. Guncel Siyahı ===");
            foreach (Mehsul qalan in anbar)
            {
                qalan.EkranaYazdir();
            }

            Console.ReadKey();
        }
    }
}