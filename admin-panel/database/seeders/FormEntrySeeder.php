use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormEntrySeeder extends Seeder
{
    public function run()
    {
        DB::table('form_entries')->insert([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            // Add other columns and data as needed
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
