<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialOrganization extends Model
{
    use HasFactory;

    protected $guarded;

    public function bank_accounts(){
        return $this->hasMany(BankAccount::class);
    }
}
