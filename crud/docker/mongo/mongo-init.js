db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'db_test'
    }
  ]
})
