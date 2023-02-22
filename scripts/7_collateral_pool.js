const { FANTOM_MINT_ADDRESS_PROVIDER } = require("./common");

async function main(network) {
  const CollateralPool = await ethers.getContractFactory(
    'FantomDeFiTokenStorage'
  );

  const collateralPool = await CollateralPool.deploy();
  await collateralPool.deployed();
  console.log(
    'FantomDeFiTokenStorage (Collateral Pool) deployed at',
    collateralPool.address
  );
  
  // await hre.run('verify:verify', {
  //   address: collateralPool.address,
  //   constructorArguments: []
  // });
  
  await collateralPool.initialize(FANTOM_MINT_ADDRESS_PROVIDER, true);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
