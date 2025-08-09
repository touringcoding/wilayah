<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provincesPath = base_path('Wilayah-Administratif-Indonesia/csv/provinces.csv');
        $regenciesPath = base_path('Wilayah-Administratif-Indonesia/csv/regencies.csv');
        $districtsPath = base_path('Wilayah-Administratif-Indonesia/csv/districts.csv');

        $provinces = [];
        if (($handle = fopen($provincesPath, 'r')) !== false) {
            fgetcsv($handle);
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (isset($data[0], $data[1])) {
                    $provinces[$data[0]] = $data[1];
                }
            }
            fclose($handle);
        }

        $regencies = [];
        if (($handle = fopen($regenciesPath, 'r')) !== false) {
            fgetcsv($handle);
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (isset($data[0], $data[1], $data[2])) {
                    $regencies[$data[0]] = [
                        'name' => $data[2],
                        'province_id' => $data[1],
                    ];
                }
            }
            fclose($handle);
        }

        $locations = [];
        if (($handle = fopen($districtsPath, 'r')) !== false) {
            fgetcsv($handle);
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (!isset($data[0], $data[1], $data[2])) {
                    continue;
                }
                $regency = $regencies[$data[1]] ?? null;
                if ($regency) {
                    $province = $provinces[$regency['province_id']] ?? null;
                    if ($province) {
                        $locations[] = [
                            'id' => $data[0],
                            'kecamatan' => $data[2],
                            'kota' => $regency['name'],
                            'provinsi' => $province,
                        ];
                    }
                }
            }
            fclose($handle);
        }

        if (!empty($locations)) {
            DB::table('locations')->insert($locations);
        }

    }
}

