import Mock from 'mockjs';

const Transactions =[];
for(let i=0;i<21; i++){
  const subTransactions = [];
  for(let j=0;j<3;j++){
    subTransactions.push(Mock.mock({
      subAccountId: Mock.Random.integer(1000, 2000),
      subAmount:Mock.Random.float(10,30),
      subDesc:'Tax Payment for AI Beverage for Henan Project'
    }));
  }
  Transactions.push(Mock.mock({
    ID: Mock.Random.integer(10000, 20000),
    Date: Mock.Random.date(),
    Desc: 'University of Glasgow & NU Project',
    RefNumber: Mock.Random.integer(2000, 3000),
    Amount: Mock.Random.float(500,600),
    SubTransactions: subTransactions
  }));

}

export { Transactions };