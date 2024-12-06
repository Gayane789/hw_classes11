class User {
  static currentId = 0;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = ++User.currentId;
    this.bankAccounts = [];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get getId() {
    return this.id;
  }

  addBankAccount(account) {
    account.id = this.bankAccounts.length + 1;
    this.bankAccounts.push(account);
    return account.id;
  }

  pay(accountId, amount) {
    const account = this.bankAccounts.find((acc) => acc.id === accountId);
    if (!account) throw new Error("Account not found");
    if (account.balance < amount) throw new Error("Insufficient funds");
    account.balance -= amount;
    return account.balance;
  }

  receive(accountId, amount) {
    const account = this.bankAccounts.find((acc) => acc.id === accountId);
    if (!account) throw new Error("Account not found");
    account.balance += amount;
    return account.balance;
  }
}

const user = new User("John", "Smith");
console.log(user.fullName);
const accountId = user.addBankAccount({ balance: 1500 });
user.pay(accountId, 100);
user.receive(accountId, 400);
console.log(user.bankAccounts);

//////////////////////////////////////////////////////////////////////////

//2
class BankAccount {
  static idCounter = 1;

  constructor(balance) {
    this.balance = balance;
    this.bankAccountId = BankAccount.idCounter++;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }
}
