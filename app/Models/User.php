<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'password_hash',
        'role',
        'status',
        'joined_date',
        'last_login',
    ];

    protected $hidden = [
        'password_hash', 
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password_hash' => 'hashed', 
            'joined_date' => 'date',
            'last_login' => 'date',
            'status' => 'boolean',
        ];
    }
    public function getAuthPassword()
    {
        return $this->password_hash;
    }
    public function getEmailForPasswordReset()
    {
        return $this->email;
    }
}