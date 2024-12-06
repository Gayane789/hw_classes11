function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.id = User.generateId();
  this.bankAccounts = [];
}

User.generateId = (function () {
  let id = 0;
  return function () {
    return ++id;
  };
})();

Object.defineProperty(User.prototype, "fullName", {
  get: function () {
    return `${this.firstName} ${this.lastName}`;
  },
}),
  Object.defineProperty(User.prototype, "getId", {
    get: function () {
      return this.id;
    },
  });

User.prototype.addBankAccount = function (account) {
  account.id = this.bankAccounts.length + 1;
  this.bankAccounts.push(account);
  return account.id;
};

User.prototype.pay = function (accountId, amount) {
  const account = this.bankAccounts.find((acc) => acc.id === accountId);
  if (!account) throw new Error("Account not found");
  if (account.balance < amount) throw new Error("Insufficient funds");
  account.balance -= amount;
  return account.balance;
};

User.prototype.receive = function (accountId, amount) {
  const account = this.bankAccounts.find((acc) => acc.id === accountId);
  if (!account) throw new Error("Account not found");
  account.balance += amount;
  return account.balance;
};

const user = new User("John", "Smith");
console.log(user.fullName);
const accountId = user.addBankAccount({ balance: 1000 });
user.pay(accountId, 100);
user.receive(accountId, 200);
console.log(user.bankAccounts);

///////////////////////////////////////////////////////////

//2
function BankAccount(balance) {
  if (!BankAccount.idCounter) BankAccount.idCounter = 1;
  this.balance = balance;
  this.bankAccountId = BankAccount.idCounter++;
}

BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
  return this.balance;
};

BankAccount.prototype.withdraw = function (amount) {
  if (amount > this.balance) {
    throw new Error("Insufficient funds");
  }
  this.balance -= amount;
  return this.balance;
};

BankAccount.prototype.getBalance = function () {
  return this.balance;
};
