# Autocomplete Pencarian Kecamatan

Implementasi Take Home Test untuk pencarian kecamatan dengan fitur autocomplete.  
User bisa mencari berdasarkan nama kecamatan, kota/kabupaten, atau provinsi, dan hasil tampil secara realtime.

## Fitur
- **Backend (Laravel)**: Endpoint `GET /api/locations?search=...`
- **Frontend (React + TailwindCSS)**: Input realtime dengan debounce, dropdown hasil, pilih 1 kecamatan.
- Bonus: Highlight keyword, simpan pilihan ke localStorage, skeleton loading.

## Screenshot
![Pencarian](Screenshot%202025-08-09%20073959.png)
![Dropdown](Screenshot%202025-08-09%20074059.png)

## Catatan
> Mohon maaf, proyek ini tidak menggunakan Docker seperti instruksi awal. Dikarenaakan pakai letop kantor yang terkunci, letop saya sendiri ada di rumah. 
> Aplikasi dijalankan langsung menggunakan Laravel dan React di lokal.

## Cara Menjalankan
**Backend:**

cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

**Frontend:**

cd frontend
npm install
npm start

Backend: http://127.0.0.1:8000/api/locations?search=ban
Frontend: http://localhost:3000