const { SFC_TO_FMINT, FANTOM_MINT_ADDRESS_PROVIDER } = require('./common');

async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const FantomLiquidationManager = await ethers.getContractFactory(
    'FantomLiquidationManager'
  );

  const fantomLiquidationManager = await FantomLiquidationManager.deploy();
  await fantomLiquidationManager.deployed();

  console.log(
    'FantomLiquidationManager deployed at',
    fantomLiquidationManager.address
  );

  await hre.run('verify:verify', {
    address: fantomLiquidationManager.address,
    constructorArguments: []
  });

  // await fantomLiquidationManager.initialize(
  //   deployerAddress,
  //   FANTOM_MINT_ADDRESS_PROVIDER,
  //   SFC_TO_FMINT
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
