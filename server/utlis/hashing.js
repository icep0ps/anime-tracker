import crypto from 'crypto';
// Function to generate a salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Function to generate a hashed password using PBKDF2
function generatePasswordHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString('hex'));
    });
  });
}

// Example users
const users = [
  {
    username: 'anime_lover123',
    password: 'examplePassword123',
  },
  {
    username: 'otaku_girl',
    password: 'strongPassword456',
  },
];

// Generate salt and hashed password for each user
users.forEach(async (user) => {
  const salt = generateSalt();
  const hashedPassword = await generatePasswordHash(user.password, salt);

  console.log(`User: ${user.username}`);
  console.log(`Salt: ${salt}`);
  console.log(`Hashed Password: ${hashedPassword}`);
  console.log();
});
