
 ======== Environment Setup =======
 
First, ensure you have the necessary tools installed on your machine:

PHP (8.2 or higher recommended)
Composer (PHP package manager)
Node.js & npm (for the React frontend)
MySQL or MariaDB (for your database)

 ======== Cloning and Setting up the File Structure =======

1. Go to the `htdocs`
2. Create a new folder `Mizushi`
3. Click the new folder → open terminal → code . → vscode
4. inside Vscode, open a new terminal and clone the github repo

  <img width="354" height="156" alt="image" src="https://github.com/user-attachments/assets/731e293a-7c43-4bde-8ffa-331585d79241" />
5. copy the `.env.example` change the copy to `.env` and uncomment DB_CONNECTION to DB_PASSWORD
• Change the DB_CONNECTION to mysql
• Change the DB_DATABASE to mizushi_database
• Change DB_USERNAME and DB_PASSWORD to your registered mysql account

 ================ Installing Dependencies  ================ 

1. in terminal run `composter install`
2. run `npm install`

 ================ Setting Up the Database  ================ 

1. run `php artisan key:generate`
2. run `php artisan migrate:fresh --seed`

 ================ Run the application  ================ 

create two terminal :
1. in the first terminal run `npm run dev`
2. in the second terminal run `php artisan serve`
3. open the link given by `php artisan serve`. E.g `http://127.0.0.1:8000/login`
4. to login, check the users table in your workbench or php admin
5. find the user with `ADMIN` or `PHARMACISTS` role
6. copy their email
7. all the password are defaulted to `password123`
8. if the credential does not match, check `UserSeeder` to see their respective email, role, and password

USER EXAMPLE :
ADMIN :
email : `jane.doe@pharmacy.com`
password : `password123`

PHARAMICSTS :
email : `john.smith@pharmacy.com`
password : `password123`
