const { FANTOM_MINT_ADDRESS_PROVIDER } = require("./common");

async function main(network) {
  const DebtPool = await ethers.getContractFactory('FantomDeFiTokenStorage');

  const debtPool = await DebtPool.deploy();
  await debtPool.deployed();
  console.log(
    'FantomDeFiTokenStorage (Debt Pool) deployed at',
    debtPool.address
  );

  // await hre.run('verify:verify', {
  //   address: debtPool.address,
  //   constructorArguments: []
  // });

  await debtPool.initialize(FANTOM_MINT_ADDRESS_PROVIDER, true);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
